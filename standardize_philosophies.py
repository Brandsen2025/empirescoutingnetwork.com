import os
import re

# Masters list from user with exact names and codes
OFFICIAL_LIST = {
    "Cruyff Intelligence": "Philosophy_01_Cruyff_Intelligence",
    "Michels Total": "Philosophy_02_Michels_Total",
    "VanGaal System": "Philosophy_03_VanGaal_System",
    "Kovacs Evolution": "Philosophy_04_Kovacs_Evolution",
    "Hiddink Adaptability": "Philosophy_05_Hiddink_Adaptability",
    "Beenhakker Global": "Philosophy_06_Beenhakker_Global",
    "Guardiola Positional": "Philosophy_07_Guardiola_Positional",
    "Carniglia European": "Philosophy_08_Carniglia_European",
    "Munoz Elegance": "Philosophy_09_Munoz_Elegance",
    "Aragones Revolution": "Philosophy_10_Aragones_Revolution",
    "Villalonga Method": "Philosophy_11_Villalonga_Method",
    "Emery European Specialist": "Philosophy_12_Emery_European_Specialist",
    "Pellegrini Elegance": "Philosophy_13_Pellegrini_Elegance",
    "Herrera Catenaccio": "Philosophy_14_Herrera_Catenaccio",
    "Rocco Revolution": "Philosophy_15_Rocco_Revolution",
    "Bearzot Pragmatic": "Philosophy_16_Bearzot_Pragmatic",
    "Lippi Sophistication": "Philosophy_17_Lippi_Sophistication",
    "Sacchi Pressing": "Philosophy_18_Sacchi_Pressing",
    "Trapattoni Mastery": "Philosophy_19_Trapattoni_Mastery",
    "Carcano Foundation": "Philosophy_20_Carcano_Foundation",
    "Cesarini Maquina": "Philosophy_21_Cesarini_Maquina",
    "Ferguson Mental": "Philosophy_22_Ferguson_Mental",
    "Busby Youth Revolution": "Philosophy_23_Busby_Youth_Revolution",
    "Robson English Soul": "Philosophy_24_Robson_English_Soul",
    "Venables Tactical Innovation": "Philosophy_25_Venables_Tactical_Innovation",
    "Winterbottom Foundation": "Philosophy_26_Winterbottom_Foundation",
    "Shankly Passion": "Philosophy_27_Shankly_Passion",
    "Clough Psychology": "Philosophy_28_Clough_Psychology",
    "Paisley Boot Room": "Philosophy_29_Paisley_BootRoom",
    "Heynckes Efficiency": "Philosophy_30_Heynckes_Efficiency",
    "Cramer Methodical": "Philosophy_31_Cramer_Methodical",
    "Hitzfeld Adaptive": "Philosophy_32_Hitzfeld_Adaptive",
    "Schon Tournament": "Philosophy_33_Schon_Tournament",
    "Herberger Method": "Philosophy_34_Herberger_Method",
    "Beckenbauer Libero": "Philosophy_35_Beckenbauer_Libero",
    "Wenger Development": "Philosophy_36_Wenger_Development",
    "Roux Provincial Genius": "Philosophy_37_Roux_Provincial_Genius",
    "Diniz Modern Revolution": "Philosophy_38_Diniz_Modern_Revolution",
    "Lazaroni European Fusion": "Philosophy_39_Lazaroni_European_Fusion",
    "Santana JogaBonito": "Philosophy_40_Santana_JogaBonito",
    "Zagallo Tactical": "Philosophy_41_Zagallo_Tactical",
    "Feola Organization": "Philosophy_42_Feola_Organization",
    "Menotti Artistry": "Philosophy_43_Menotti_Artistry",
    "Bilardo Pragmatism": "Philosophy_44_Bilardo_Pragmatism",
    "Bielsa Intensity": "Philosophy_45_Bielsa_Intensity",
    "Simeone Cholismo": "Philosophy_46_Simeone_Cholismo",
    "Bianchi Passion": "Philosophy_47_Bianchi_Passion",
    "Czeizler Method": "Philosophy_48_Czeizler_Method",
    "Sebes Revolutionary": "Philosophy_49_Sebes_Revolutionary",
    "Liedholm Swedish Italian": "Philosophy_50_Liedholm_Swedish_Italian",
    "Goethals Belgian Excellence": "Philosophy_51_Goethals_Belgian_Excellence",
    "Osim Intelligence": "Philosophy_52_Osim_Intelligence",
    "Lobanovskyi Scientific": "Philosophy_53_Lobanovskyi_Scientific",
    "Petru Technical": "Philosophy_54_Petru_Technical",
    "Penev Revolution": "Philosophy_55_Penev_Revolution",
    "Milutinovic Globalization": "Philosophy_56_Milutinovic_Globalization",
    "Mourinho Warfare": "Philosophy_57_Mourinho_Warfare",
    "Ranieri Miracle": "Philosophy_58_Ranieri_Miracle",
    "Suppici Genesis": "Philosophy_59_Suppici_Genesis",
    "DeVisser Global": "Philosophy_60_DeVisser_Global"
}

# Legacy mapping
LEGACY_MAP = {
    "Van Gaal": "VanGaal System",
    "VanGaal": "VanGaal System",
    "Van Gaal System": "VanGaal System",
    "Sarri": "Sacchi Pressing",
    "Keegan": "Robson English Soul",
    "Dalglish": "Paisley Boot Room",
    "Clemente": "Bilardo Pragmatism",
    "Klopp": "Bielsa Intensity",
    "Tabárez": "Bearzot Pragmatic",
    "Tabarez": "Bearzot Pragmatic",
    "Caldara": "Rocco Revolution",
    "Ramón Díaz": "Menotti Artistry",
    "Ramon Diaz": "Menotti Artistry",
    "Ancelotti": "Lippi Sophistication",
    "Capello": "Trapattoni Mastery",
    "Scaloni": "Simeone Cholismo",
    "Zidane": "Lippi Sophistication",
    "Conte": "Simeone Cholismo",
    "Pochettino": "Bielsa Intensity",
    "Arteta": "Guardiola Positional",
    "Postecoglou": "Bielsa Intensity",
    "Xavi": "Guardiola Positional",
    "Inzaghi": "Trapattoni Mastery",
    "Spalletti": "Sacchi Pressing",
    "Allegri": "Bearzot Pragmatic",
    "Klopp Intensity": "Bielsa Intensity"
}

# Combined reverse map for easy lookup
LOOKUP_MAP = {}
for name, code in OFFICIAL_LIST.items():
    short_name = name.split()[0]
    LOOKUP_MAP[name.lower()] = (name, code)
    LOOKUP_MAP[short_name.lower()] = (name, code)
    LOOKUP_MAP[code.lower()] = (name, code)

for old_name, new_name in LEGACY_MAP.items():
    official_name, official_code = LOOKUP_MAP[new_name.lower()]
    LOOKUP_MAP[old_name.lower()] = (official_name, official_code)

def standardize_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split to avoid "Key Relationships" and "Career Statistics" and "Major Honors"
    # where names refer to people/managers directly.
    # We mainly target Metric and Philosophy sections.
    
    # Simple logic: avoid sections after "Key Relationships" or "Key Matches"
    # Actually, legacy names in metric contexts are usually in parentheses or pills.
    
    changed = False

    # 1. Handle spans/text with philosopher in parentheses
    def replace_parentheses(match):
        nonlocal changed
        inner_content = match.group(2)
        
        # Don't replace if it's already a full official code
        if "Philosophy_" in inner_content:
            return match.group(0)

        # Try to find a philosopher
        for key in sorted(LOOKUP_MAP.keys(), key=len, reverse=True):
            if key == inner_content.lower() or (key in inner_content.lower() and len(key) > 3):
                name, code = LOOKUP_MAP[key]
                changed = True
                return f"{match.group(1)}{code}{match.group(3)}"
        return match.group(0)

    # Replace (Keegan), (Sarri), etc.
    content = re.sub(r'(\()([^)]+)(\))', replace_parentheses, content)

    # 2. Handle spans with metric-name (wider search)
    def replace_metric_name(match):
        nonlocal changed
        inner_content = match.group(2)
        
        if "Philosophy_" in inner_content: return match.group(0)

        for key in sorted(LOOKUP_MAP.keys(), key=len, reverse=True):
            if key in inner_content.lower():
                name, code = LOOKUP_MAP[key]
                new_val = f"{name} ({code})"
                changed = True
                return f'{match.group(1)}{new_val}{match.group(3)}'
        return match.group(0)

    content = re.sub(r'(<span class="metric-name">)([^<]+)(</span>)', replace_metric_name, content)

    # 3. Handle pills
    def replace_pill(match):
        nonlocal changed
        inner_content = match.group(2)
        if "Philosophy_" in inner_content: return match.group(0)

        for key in sorted(LOOKUP_MAP.keys(), key=len, reverse=True):
            if key in inner_content.lower():
                name, code = LOOKUP_MAP[key]
                score_match = re.search(r'[\d.]+/10', inner_content)
                score_match2 = re.search(r'\d+\.\d+', inner_content)
                score = ""
                if score_match: score = f" {score_match.group(0)}"
                elif score_match2: score = f" {score_match2.group(0)}"
                
                new_val = f"{name} ({code}){score}"
                changed = True
                return f'{match.group(1)}{new_val}{match.group(3)}'
        return match.group(0)

    content = re.sub(r'(<span class="pill">)([^<]+)(</span>)', replace_pill, content)

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    directory = "."
    files = [f for f in os.listdir(directory) if f.endswith('.html')]
    
    updated_count = 0
    for filename in files:
        if standardize_file(filename):
            print(f"Updated: {filename}")
            updated_count += 1
            
    print(f"\nDone. Updated {updated_count} files.")

if __name__ == "__main__":
    main()
