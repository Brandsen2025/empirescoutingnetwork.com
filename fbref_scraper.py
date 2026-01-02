#!/usr/bin/env python3
"""
Empire FGA - FBref Scraper
Scrapes player statistics from FBref.com for FGA metric calculation
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json
from datetime import datetime

class FBrefScraper:
    def __init__(self):
        self.base_url = "https://fbref.com"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
    def scrape_league(self, league_url, league_name):
        """Scrape all players from a specific league"""
        print(f"\n🔍 Scraping {league_name}...")
        
        try:
            response = requests.get(league_url, headers=self.headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find player stats table
            stats_table = soup.find('table', {'id': 'stats_standard'})
            
            if not stats_table:
                print(f"   ⚠️  No stats table found")
                return []
            
            # Parse table
            df = pd.read_html(str(stats_table))[0]
            
            # Clean column names (FBref has multi-level headers)
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = [' '.join(col).strip() for col in df.columns.values]
            
            print(f"   ✅ Found {len(df)} players")
            
            return df.to_dict('records')
            
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return []
    
    def calculate_fga_from_stats(self, player_stats):
        """Calculate FGA rating from scraped stats"""
        base = 70.0
        
        # Extract key stats (handle various column name formats)
        goals = float(player_stats.get('Gls', 0) or 0)
        assists = float(player_stats.get('Ast', 0) or 0)
        xg = float(player_stats.get('xG', 0) or 0)
        npxg = float(player_stats.get('npxG', 0) or 0)
        xag = float(player_stats.get('xAG', 0) or 0)
        minutes = float(player_stats.get('Min', 0) or 0)
        
        # Goals contribution (max +12)
        if minutes > 0:
            goals_per_90 = (goals / minutes) * 90
            base += min(goals_per_90 * 8, 12.0)
        
        # Assists contribution (max +8)
        if minutes > 0:
            assists_per_90 = (assists / minutes) * 90
            base += min(assists_per_90 * 6, 8.0)
        
        # xG performance (max +6)
        base += min(xg * 0.4, 6.0)
        
        # Consistency bonus (minutes played, max +4)
        if minutes > 1000:
            base += 4.0
        elif minutes > 500:
            base += 2.0
        
        return min(base, 95.0)  # Cap at 95
    
    def scrape_top_leagues(self):
        """Scrape top European leagues"""
        leagues = {
            'Premier League': '/en/comps/9/Premier-League-Stats',
            'La Liga': '/en/comps/12/La-Liga-Stats',
            'Serie A': '/en/comps/11/Serie-A-Stats',
            'Bundesliga': '/en/comps/20/Bundesliga-Stats',
            'Ligue 1': '/en/comps/13/Ligue-1-Stats'
        }
        
        all_players = []
        
        for league_name, league_path in leagues.items():
            league_url = self.base_url + league_path
            players = self.scrape_league(league_url, league_name)
            
            for player in players:
                player['league'] = league_name
                player['fga_rating'] = self.calculate_fga_from_stats(player)
                all_players.append(player)
            
            # Be nice to the server
            time.sleep(3)
        
        return all_players

def main():
    print("=" * 80)
    print("🚀 EMPIRE FGA - FBREF SCRAPER")
    print("=" * 80)
    
    scraper = FBrefScraper()
    
    print("\n📊 Scraping Top 5 European Leagues...")
    players = scraper.scrape_top_leagues()
    
    print(f"\n✅ SCRAPING COMPLETE!")
    print(f"   Total players scraped: {len(players)}")
    
    if players:
        # Show top 10 by FGA
        players_sorted = sorted(players, key=lambda x: x.get('fga_rating', 0), reverse=True)
        print(f"\n🏆 TOP 10 PLAYERS BY FGA:")
        for i, p in enumerate(players_sorted[:10], 1):
            name = p.get('Player', 'Unknown')
            league = p.get('league', 'Unknown')
            fga = p.get('fga_rating', 0)
            goals = p.get('Gls', 0)
            assists = p.get('Ast', 0)
            print(f"   {i:2d}. {name:25s} ({league:15s}) FGA: {fga:.1f} | G:{goals} A:{assists}")
        
        # Save to JSON
        output_file = f'fbref_players_{datetime.now().strftime("%Y%m%d")}.json'
        with open(output_file, 'w') as f:
            json.dump(players, f, indent=2)
        
        print(f"\n💾 Saved: {output_file}")
        print(f"   {len(players)} players with FGA ratings ready to merge!")
    
    print("\n" + "=" * 80)

if __name__ == "__main__":
    main()

# USAGE:
# python3 fbref_scraper.py
#
# OUTPUT:
# - fbref_players_YYYYMMDD.json (all scraped players with FGA ratings)
#
# NEXT STEPS:
# 1. Run this script: python3 fbref_scraper.py
# 2. Merge output with mega database
# 3. Deploy updated database
#
# CUSTOMIZATION:
# - Add more leagues to leagues dict
# - Adjust FGA calculation formula
# - Add more stats (tackles, passes, etc.)
