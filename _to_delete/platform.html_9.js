
const EXISTING_PROFILES=new Set(["Aaron_Anselmino.html", "Aaron_Bouwman.html", "Aaron_Ramsdale.html", "Aaron_Ramsey.html", "Abassi_Boinaheri.html", "Abdallah_Bah.html", "Abdallah_Liégeon.html", "Abdel_Aziz_Bouderbala.html", "Abdel_Krimau_Merry.html", "Abdelhafid_Tasfaout.html", "Abdeljalil_Aid.html", "Abdelkader_Ferhaoui.html", "Abdellah_Ouazane.html", "Abdoul_Karim_Bangoura.html", "Abdoul_Salam_Sow.html", "Abdoulaye_Camara.html", "Abdoulaye_Diallo.html", "Abdoulaye_Traoré.html", "Abdukodir_Khusanov.html", "Abdul_Issahaku.html", "Abedi_Pele.html", "Abel_Herrera.html", "Abel_Jorge_Pereira_da_Silva.html", "Abel_Marc.html", "Abelardo_Eliseo_Vallejos.html", "Abhishek_Singh_Tekcham.html", "Abibou_Tchagnao.html", "Abner.html", "Aboubacar_Bassinga.html", "Aboubacar_Katty.html", "Abudu_Cadri_Fatadjo.html", "Abílio_António_Gomes_Novais.html", "Acebal_Farias_'Zinho'.html", "Ada_Hegerberg.html", "Adam_El_Boughlamy.html", "Adam_Zenati.html", "Adamo_Nagalo.html", "Adel_Boutobba.html", "Adel_Chedli.html", "Adelino_Augusto_G._D._Barros.html", "Adelino_Carlos_Morais_Nunes.html", "Adelino_da_Rocha_Vieira.html", "Adelqui_Cornaglia.html", "Adelqui_Mario_Cornaglia.html", "Adem_Zorgane.html", "Ademir_Da_Guia.html", "Ademir_Marques.html", "Adick_Koot.html", "Adil_Bourabaa.html", "Adilson_de_Almeida.html", "Adnane_Kharroubi.html", "Adne_Midtskogen.html", "Adolfino_Cañete.html", "Adolfo_Baran.html", "Adolfo_Nef.html", "Adolfo_Pedernera.html", "Adolfo_Valencia.html", "Adonir_Bernardes_de_Alcântara.html", "Adrian_Alberto_Bianchi.html", "Adrian_Gonzalez.html", "Adrian_Guillermo.html", "Adrian_Jimenez.html", "Adrian_Purzycki.html", "Adriano_Bertaccini.html", "Adriano_Delphis.html", "Adriano_Santos_Spencer.html", "Adrien_Perez.html", "Adrián_Avalos.html", "Adrián_Bianchi.html", "Adrián_Blas_Taffarel.html", "Adrián_Claudio_Marini.html", "Adrián_Coria.html", "Adrián_Domenech.html", "Adrián_Fabio_Alvarez.html", "Adrián_Fernandez.html", "Adrián_Fernando_Daniele.html", "Adrián_Fornero.html", "Adrián_Gorostidi.html", "Adrián_Paz.html", "Afonso_Abel_de_Campos.html", "Afonso_Patrão.html", "Agon_Mucolli.html", "Agostinho_Manuel_Almeida_Caetano.html", "Agustin_Aranzabal.html", "Agustin_Giay.html", "Agustin_Orion.html", "Agustin_Palavecino.html", "Agustin_Rossi.html", "Agustin_Urzi.html", "Agustín_Armando_Mansilla.html", "Agustín_Diaz.html", "Ahkeem_Rose.html", "Ahmed_Bonnah.html", "Ahmed_Majid.html", "Ahmetcan_Kaplan.html", "Aime_Gaval.html", "Aimé_Manuel_Chocolate_Cerqueira.html", "Aisar_Ahmed.html", "Aissa_Fouka.html", "Al_Hobo_Senoussi.html", "Alain_Bare.html", "Alain_Ben_Mabrouk.html", "Alain_Casanova.html", "Alain_Caveglia.html", "Alain_Couriol.html", "Alain_Doare.html", "Alain_Durand.html", "Alain_Fiard.html", "Alain_Geiger.html", "Alain_Goma.html", "Alain_Noel.html", "Alain_Polaniok.html", "Alain_Ravera.html", "Alain_Roche.html", "Alain_Wantz.html", "Alain_Zemis.html", "Alama_Soumah.html", "Alan_Shearer.html", "Alan_Virginius.html", "Albano_Bizarri.html", "Albano_Bizzarri.html", "Albeiro_Usuriaga.html", "Albeiro_Usuriaga_Lopez.html", "Albert_Cartier.html", "Albert_Rust.html", "Alberto_Acosta.html", "Alberto_Bica.html", "Alberto_Bruno_Botto.html", "Alberto_Collazo.html", "Alberto_Di_Chiara.html", "Alberto_Federico_Acosta.html", "Alberto_García_Aspe.html", "Alberto_Godoy.html", "Alberto_Goicoechea.html", "Alberto_Gonzalez.html", "Alberto_Gonzalez_montevideo-wanderers.html", "Alberto_Jesús_Gallucci.html", "Alberto_Marcico.html", "Alberto_Orellana.html", "Alberto_Osvaldo_Boggio.html", "Alberto_Pascual_Garrido.html", "Alberto_Paulo_dos_Santos_Cabral.html", "Alberto_Pedro_Vivalda.html", "Alberto_Rodriguez.html", "Alberto_Spencer.html", "Alberto_Tarantini.html", "Alberto_Vargas.html", "Alberto_Vivalda.html", "Alberto_da_Silva_Coelho.html", "Albijon_Muzaci.html", "Albin_Sporrong.html", "Albion_Football_Club.html", "Alboury_Lah.html", "Alcides_Rodrigues_Tavares.html", "Alcino_Jorge_da_Costa_Leite_Dubo.html", "Aldevalido_José_de_Lima.html", "Aldo_Alfredo_Repetti.html", "Aldo_Duscher.html", "Aldo_Murillo.html", "Aldo_Osorio.html", "Aldo_Paredes.html", "Alejandro_Alfaro_Moreno.html", "Alejandro_Alfredo_Montenegro.html", "Alejandro_Barberon.html", "Alejandro_Baron.html", "Alejandro_Carrizo.html", "Alejandro_Castro.html", "Alejandro_Esteban_Barberon.html", "Alejandro_Fabio_Lanari.html", "Alejandro_Fabián_Presa.html", "Alejandro_Ferreyra.html", "Alejandro_Giuntini.html", "Alejandro_Glaria.html", "Alejandro_Gomes_Rodriguez.html", "Alejandro_Gonzalez.html", "Alejandro_Granados.html", "Alejandro_Javier_Larrea.html", "Alejandro_José_Seguessa.html", "Alejandro_Julián_Méndez.html", "Alejandro_Lanari.html", "Alejandro_Lanari_2.html", "Alejandro_Mancuso.html", "Alejandro_Marcelo_Russo.html", "Alejandro_Marinilli.html", "Alejandro_Martín_Kenig.html", "Alejandro_Montenegro.html", "Alejandro_Nannini.html", "Alejandro_Omar_Simionato.html", "Alejandro_Peralta.html", "Alejandro_Ruidiaz.html", "Alejandro_Russo.html", "Alejandro_S_Grandi.html", "Alejandro_Sabella.html", "Alejandro_Saccone.html", "Alejandro_Torres_Grifassi.html", "Alejandro_Victor_Mancuso.html", "Alejo_Veliz.html", "Aleksandar_Stankovic.html", "Aleksandr_Borodyuk.html", "Aleksandr_Mostovoi.html", "Alessandro_Del_Piero.html", "Alessandro_Melli.html", "Alessandro_Milani.html", "Alessandro_Nesta.html", "Alessandro_Pezzoli_Dashboard.html", "Alessandro_Vogt.html", "Alessio_Marcaccini.html", "Alesson.html", "Alex_Aguinaga.html", "Alex_Cropley.html", "Alex_Gersbach.html", "Alex_Javier_Comas.html", "Alex_Jimenez.html", "Alex_Luna.html", "Alex_Morgan.html", "Alex_Teixeira.html", "Alexander_Sorloth.html", "Alexander_Vencel.html", "Alexander_Zavarov.html", "Alexandra_Popp.html", "Alexandre_Bes.html", "Alexandre_Manuel_Fortes_Alhinho.html", "Alexandre_Valbon.html", "Alexis_Araujo.html", "Alexis_Garcia.html", "Alexis_Mac_Allister.html", "Alexis_Noble.html", "Alexis_Sanchez.html", "Alexis_Vossah.html", "Alfredo_Albariño.html", "Alfredo_Berti.html", "Alfredo_Cascini.html", "Alfredo_Damián_Mendoza.html", "Alfredo_Daniel_Turdo.html", "Alfredo_Di_Stefano.html", "Alfredo_Gomez.html", "Alfredo_Graciani.html", "Alfredo_Grelak.html", "Alfredo_Jorge_Llane.html", "Alfredo_Llane.html", "Alfredo_Lopez.html", "Alfredo_Magalhães_S._Rodrigues.html", "Alfredo_Mendoza.html", "Alfredo_Morelos.html", "Alfredo_Moreno.html", "Alfredo_Oscar_Graciani.html", "Alfredo_Rojas.html", "Alfredo_Santiago_Juarez.html", "Alfredo_Villegas.html", "Alfredo_da_Silva_Castro.html", "Ali_Abdi.html", "Ali_Benarbia.html", "Ali_Bouafia.html", "Ali_Boumnijel.html", "Ali_Dembele.html", "Ali_Suljic.html", "Alim_Ben_Mabrouk.html", "Aliocha_Asanovic.html", "Alisson_Becker.html", "Allan_Simonsen.html", "Alphonse_Marie_Tchami.html", "Alphonse_Tchami_Djomaha.html", "Alphonso_Davies.html", "Alvaro_Alejandro_Generali.html", "Alvaro_Dominguez.html", "Alvaro_Fidalgo.html", "Alvaro_Gutierrez.html", "Alvaro_Lopez_Bedoya.html", "Alvaro_Neder_Escames.html", "Alvaro_Recoba.html", "Alvaro_Rodriguez.html", "Alvin_Petit_Dol.html", "Alvyn_Sanches.html", "Amadeo_Gasparini.html", "Amadou_Diakite.html", "Amadou_Diawara.html", "Amadou_Haidara.html", "Amara_Simba.html", "Amara_Traoré.html", "Americo_Gallego.html", "Americo_Jimenez_Aguilera.html", "Americo_Siviardo_Ozan.html", "Amin_Chiakha.html", "Amine_Harit.html", "Amir_Boutakbout.html", "Amir_Nguyia.html", "Amâncio_Morales_Trigo.html", "Américo_Gallego.html", "Amílcar_Jorge_Ivanovic.html", "Amílcar_Pedro_da_Cruz_Delgado.html", "Anan_Khalaili.html", "Anass_Salah_Eddine.html", "Anderson_Asiedu.html", "Andoni_Cedrun.html", "Andraz_Lipec.html", "Andrea_Librici.html", "Andreas_Moller.html", "Andres_Escobar.html", "Andres_Felipe_Roman.html", "Andres_Iniesta.html", "Andrew_Marie_Sainte.html", "André_Amitrano.html", "André_Basile.html", "André_Biancarelli.html", "André_Blanc.html", "André_Kana-Biyik.html", "Andrés_Bullentini.html", "Andrés_Gaitan.html", "Andrés_Garrone.html", "Andrés_Guglielminpietro.html", "Andrés_Gustavo_Silva_Da.html", "Andrés_Javier_Martinez.html", "Andrés_Malvestiti.html", "Andrés_Malvestitti.html", "Andrés_Miguel_Grande.html", "Andrés_Noguera.html", "Andrés_Orellano.html", "Andrés_Pablo_Larrosa.html", "Andrés_Yllana.html", "Ange_Yoan_Bonny.html", "Angel_Alejandro_Aranda.html", "Angel_Casas.html", "Angel_Comizzo.html", "Angel_David_Comizzo.html", "Angel_Di_Maria.html", "Angel_Guillermo_Hoyos.html", "Angel_Guzman.html", "Angel_Labruna.html", "Angel_Morales.html", "Angel_Yekel.html", "Angelo_Candido.html", "Angelo_Hugues.html", "Angus_Thurgate.html", "Anibal_Chala.html", "Anibal_Fabian_Mugione.html", "Anibal_Matellan.html", "Anis_Ben_Moussa.html", "Anthony Patti.html", "Anthony_Bancarel.html", "Anthony_Braizat.html", "Anthony_Dennis.html", "Anthony_Elanga.html", "Anthony_John_Sealy.html", "Anthony_Pantazopoulos.html", "Anthony_Patti.html", "Anto_Drobnjak.html", "Antoine_Cervetti.html", "Antoine_Kombouaré.html", "Antoine_Livemont.html", "Antoine_Martinez.html", "Antoine_Pfrunner.html", "Antoine_Semenyo.html", "Antoine_Sibierski.html", "Anton_Gaaei.html", "Antone_Bossenberry.html", "Antonio_Alzamendi.html", "Antonio_Apud.html", "Antonio_Barijho.html", "Antonio_Benarrivo.html", "Antonio_Campolo.html", "Antonio_Daniel_Baruho.html", "Antonio_Daniel_Cianciollo.html", "Antonio_Giraldi.html", "Antonio_Nusa.html", "Antonio_Rattin.html", "Antonio_Roma.html", "Antonio_Rubén_Luna.html", "Antonio_Sanchez_Astrolon.html", "Antonio_Valencia.html", "Antonio_Vattimos.html", "Antonio_Vidal_Gonzales.html", "Antonio_Vidal_Gonzalez.html", "António_A._Alves_de_Oliveira.html", "António_A._Cerqueira_Coelho_Jorge.html", "António_Aires_dos_Santos_Aparício.html", "António_Augusto_Gomes_de_Sousa.html", "António_Augusto_da_Silva_Veloso.html", "António_Carlos_Silva.html", "António_Dias_Graça_Nunes.html", "António_Duarte_R._França_Martins.html", "António_Fernandes.html", "António_Ferreira_Carvalho.html", "António_Henriques_Jesus_Oliveira.html", "António_Isaías_Carvalho_Miranda.html", "António_Jesus_Pereira.html", "António_Jorge_Oliveira_Justinano.html", "António_Jorge_Rodrigues_Amaral.html", "António_Jorge_da_Silva_Pinto_Miguel.html", "António_José_Alves_Ribeiro.html", "António_José_Lima_Pereira.html", "António_José_Loureiro_Barradas.html", "António_José_Pereira_de_Carvalho.html", "António_José_R._Rescela_da_Silva.html", "António_José_Saúde_dos_Santos.html", "António_José_Vieira_Ferreira_Monteiro.html", "António_José_de_Azevedo_Pereira.html", "António_José_de_Sousa_R._Madureira.html", "António_João_Nogueira_dos_Santos.html", "António_Luís_Amaral_Resende.html", "António_Luís_Ventura_de_Pinho.html", "António_Manuel_Cordeiro_Andrade.html", "António_Manuel_Ferreira_da_Silva.html", "António_Manuel_Frasco_Vieira.html", "António_Manuel_Martins_Rocha.html", "António_Manuel_Nogueira_R._Freitas.html", "António_Manuel_Pacheco_Domingos.html", "António_Manuel_Silva_Cruz.html", "António_Maurício_Farinha_N._Morais.html", "António_Vaz_C._da_Silva.html", "António_da_Conceição_S._Oliveira.html", "António_de_Oliveira_Caetano.html", "António_dos_Santos_F._André.html", "Anuar_Tuhami.html", "Aníbal_Matellan.html", "Aníbal_Muggione.html", "Aníbal_Servando_Marrero.html", "Aral_Simsir.html", "Araújo_Ferreira_da_Silva.html", "Arbnor_Mucolli.html", "Archie_Gray.html", "Arda_Akgun.html", "Arda_Guler.html", "Ardian_Kozniku.html", "Ariel_Alberto_Moreno.html", "Ariel_Alfredo_Montenegro.html", "Ariel_Antonio_Valenti.html", "Ariel_Arias.html", "Ariel_Castello.html", "Ariel_Catinot.html", "Ariel_Cozzoni.html", "Ariel_Cufaro_Russo.html", "Ariel_Donnet.html", "Ariel_Edgardo_Catinot.html", "Ariel_Eduardo_Boldrini.html", "Ariel_Enrique_De_Armas.html", "Ariel_Ernesto_Perticarari.html", "Ariel_Francisco_Santoro.html", "Ariel_Germán_Giles.html", "Ariel_Graña.html", "Ariel_Ibagaza.html", "Ariel_José_Krasouski.html", "Ariel_Krasouski.html", "Ariel_Lopez.html", "Ariel_Mario_Are.html", "Ariel_Moreno.html", "Ariel_Mosor.html", "Ariel_Orellano.html", "Ariel_Osvaldo_Cozzoni.html", "Ariel_Pereyra.html", "Ariel_Rocha.html", "Ariel_Rubén_Cuffaro_Russo.html", "Ariel_Wiktor.html", "Ariel_Zapata.html", "Aristide_Zossou.html", "Arjen_Robben.html", "Armando_Gonzalez.html", "Armando_J_Dely_Valdes.html", "Armando_José_Correia_Elísio.html", "Armando_Martinez.html", "Armando_Obispo.html", "Armando_Quinteros.html", "Armando_dos_Santos.html", "Arnaldo_Ortega.html", "Arnaldo_Sialle.html", "Arnaud_Duncker.html", "Arnaud_Gonzalez.html", "Arnaud_Le_Lann.html", "Arnoldo_Iguaran.html", "Arsenio_Benitez.html", "Arsenio_Benitez_Garza.html", "Arsenio_Benitez_Zarza.html", "Arsenio_Erico.html", "Arsenio_Ramon_Benitez.html", "Artem_Dovbyk.html", "Arthur_Friedenreich.html", "Arthur_Theate.html", "Artur_Alberto_Ferreira_da_Ponte.html", "Artur_José_Senedo.html", "Arturo_Vidal.html", "Arturo_Yorno.html", "Arístides_Pertot.html", "Asilbek_Aliev.html", "Assan_Ouedraogo.html", "Assane_Diao.html", "Astrada.html", "Atakan_Çankaya.html", "Atilio_Oyola.html", "Atletico_CP_dashboard.html", "Augustine_Okocha.html", "Augusto_Manuel_Santos_Jerónimo.html", "Augusto_Nilda_Gama.html", "Augusto_Soares_Inácio.html", "Augusto_Souza_Almacar.html", "Aurele_Amenda.html", "Aurele_Amendra.html", "Axel_Bamba.html", "Axel_Disasi.html", "Axel_Gendreau.html", "Ayoub_Oufkir.html", "Ayyoub_Bouaddi.html", "Aziz_Bouderbala.html", "Azzedine_Doufikar.html", "Baguio_Fernandes_Marques.html", "Baris_Ekincier.html", "Barsas_Aguiar.html", "Bart_Verbruggen.html", "Basar_Onal.html", "Basile_Boli.html", "Bastien_Meupiyou.html", "Baudoni_Arnesto_Freire.html", "Bebiano_Gomes.html", "Bejo_Filipe_Dias_de_Sousa.html", "Belmiro_Ferreira_Faria_Couto.html", "Ben_Davies.html", "Ben_El_Idrissi.html", "Benedikt_Pichler.html", "Benjamim_Pereira_Sobrinho.html", "Benjamin_Clement.html", "Benjamin_Rollheiser.html", "Benoît_Cauet.html", "Benoît_Le_Bris.html", "Benoît_Thans.html", "Benoît_Tihy.html", "Berkay_Yilmaz.html", "Bernard_Allou.html", "Bernard_Casoni.html", "Bernard_Diomède.html", "Bernard_Ferrer.html", "Bernard_Genghini.html", "Bernard_Gimenez.html", "Bernard_Lama.html", "Bernard_Lambourde.html", "Bernard_Mendy.html", "Bernard_Pardo.html", "Bernard_Pascual.html", "Bernard_Zénier.html", "Bernardo.html", "Bernardo_Redin.html", "Bernardo_Romeo.html", "Bernardo_Villalba.html", "Bertrand_Delas.html", "Bertrand_Reuzeau.html", "Bertug_Yildirim.html", "Bianneider_Tamayo.html", "Bigaúla_Lamba.html", "Bilel_Brahimi.html", "Bixente_Lizarazu.html", "Blas_Armando_Giunta.html", "Blas_Giunta.html", "Blaz_Drascek.html", "Blás_Giunta.html", "Bobby_Adekanye.html", "Bobby_Moore.html", "Boniek_Garcia.html", "Bonifacio_Escobar.html", "Boris_Diékoct.html", "Borja_Arellano.html", "Boro_Primorac.html", "Boubacar_Kambel-Seck.html", "Boudewijn_Pahlpatz.html", "Brad_Pirioua.html", "Bradley_Sample.html", "Brandon_Borrello.html", "Brasileirao_Serie_A_1998_Standings.html", "Braydon_Manu.html", "Brenden_Aaronson.html", "Brennan_Johnson.html", "Brian_Jensen.html", "Brian_Laudrup.html", "Brian_Madjo.html", "Romelu_Lukaku.html", "Brian_Stein.html", "Brice_Negouai.html", "Brice_Wembagono.html", "Brison_Fernandes.html", "Bruce_Grobelaar.html", "Bruno_Alicarte.html", "Bruno_Bellone.html", "Bruno_Calegari.html", "Bruno_Carotti.html", "Bruno_Germain.html", "Bruno_Gimenez.html", "Bruno_Guimaraes.html", "Bruno_Génésio.html", "Bruno_Irles.html", "Bruno_Martini.html", "Bruno_N'Gotty.html", "Bruno_Ngotty.html", "Bruno_Pabois.html", "Bruno_Rodriguez.html", "Bruno_Silva.html", "Bruno_Steck.html", "Bruno_Valencony.html", "Bruny_Simba.html", "Bryan_Heynen.html", "Bryan_Ruiz.html", "Buba_Sangare.html", "Bukayo_Saka.html", "Bwanga_Tshimen.html", "Bzo_Boávio_Coelho.html", "Caden_Clark.html", "Cafu.html", "Caio_Guimar_da_Costa.html", "Caio_Henrique.html", "Carles_Gil.html", "Carlo_Ancelotti.html", "Carlos_Adolfo_Ereros.html", "Carlos_Aguilera.html", "Carlos_Alberto.html", "Carlos_Alberto_Bastos_Parente.html", "Carlos_Alberto_Candia.html", "Carlos_Alberto_Canuto_Correia.html", "Carlos_Alberto_Enrique.html", "Carlos_Alberto_Galvan.html", "Carlos_Alberto_Garcia.html", "Carlos_Alberto_Macat.html", "Carlos_Alberto_Martinho_Cabral.html", "Carlos_Alberto_Mayor.html", "Carlos_Alberto_Panciroli.html", "Carlos_Alberto_Pereyra.html", "Carlos_Alberto_Rodrigues_Moreira.html", "Carlos_Alejandro_Alfaro_Moreno.html", "Carlos_Alejandro_Dure.html", "Carlos_Amodeo.html", "Carlos_Andersen.html", "Carlos_Augusto_S.C._Faria.html", "Carlos_Bacca.html", "Carlos_Bertero.html", "Carlos_Bianchi.html", "Carlos_Bilardo.html", "Carlos_Borgobello.html", "Carlos_Bossio.html", "Carlos_Bustos.html", "Carlos_Cabrera.html", "Carlos_Carrio.html", "Carlos_Casartelli.html", "Carlos_Castagneto.html", "Carlos_Ceferino_Diaz.html", "Carlos_Chaile.html", "Carlos_Claudio_Cenci.html", "Carlos_Clotet.html", "Carlos_Compagnucci.html", "Carlos_Cordoba.html", "Carlos_Cordone.html", "Carlos_Cura_Masino.html", "Carlos_D_De_Leon.html", "Carlos_Daniel_Moya.html", "Carlos_Daniel_Tapia.html", "Carlos_Daniel_Tapia_2.html", "Carlos_Diaz.html", "Carlos_Duarte_Freitas_Veiga_Barreto.html", "Carlos_E_Rodao.html", "Carlos_Eduardo_Alherigo.html", "Carlos_Eduardo_Deus_Pereira.html", "Carlos_Eduardo_Martinez.html", "Carlos_Enrique.html", "Carlos_Ereros.html", "Carlos_Estrada.html", "Carlos_Favier_Soca.html", "Carlos_Fernando_Navarro_Montoya.html", "Carlos_Fernando_Redondo.html", "Carlos_Fonseca_da_Silva.html", "Carlos_Forbs.html", "Carlos_Fortunato.html", "Carlos_Gabriel_Amodeo.html", "Carlos_Garcia.html", "Carlos_Garnier.html", "Carlos_Germán_Arangio.html", "Carlos_Gonzalez.html", "Carlos_Guillermo_Curletto.html", "Carlos_Gustavo_Alderete.html", "Carlos_Gustavo_Jones.html", "Carlos_Henao.html", "Carlos_Héctor_Alvarez.html", "Carlos_Héctor_Bertero.html", "Carlos_Ischia.html", "Carlos_Isidro_Olaran.html", "Carlos_Javier_Mac_Allister.html", "Carlos_Jorge_Camacho_Duntas.html", "Carlos_Jorge_Marques_Caldas_Xavier.html", "Carlos_Jose_Posetto.html", "Carlos_L_Rodriguez.html", "Carlos_Leeb.html", "Carlos_Leonardo_Morales.html", "Carlos_Leonardo_Viana.html", "Carlos_Lloveras.html", "Carlos_Lopez.html", "Carlos_Luis_Ischia.html", "Carlos_Mac_Allister.html", "Carlos_Macat.html", "Carlos_Manuel_Antão_Ribeiro.html", "Carlos_Manuel_Barroso_Alves.html", "Carlos_Manuel_Correia_dos_Santos.html", "Carlos_Manuel_Costa_Padrão.html", "Carlos_Manuel_Gonçalves_Ribeiro.html", "Carlos_Manuel_Leixão_de_Sousa_Bouças.html", "Carlos_Manuel_Magalhães_Valente.html", "Carlos_Manuel_O._Silva.html", "Carlos_Manuel_Pereira_Pinto.html", "Carlos_Manuel_Sousa_Ferreira.html", "Carlos_Manuel_Vinha_Lopes.html", "Carlos_Mario_Cura_Mazzino.html", "Carlos_Mario_Goyen.html", "Carlos_Martinez.html", "Carlos_Mayor.html", "Carlos_Mazzoni.html", "Carlos_Mondadore.html", "Carlos_Morales_Santos.html", "Carlos_Mozer.html", "Carlos_Munoz_Martinez.html", "Carlos_Navarro_Montoya.html", "Carlos_Netto.html", "Carlos_Odriozola.html", "Carlos_Olaran.html", "Carlos_Pancirolli.html", "Carlos_Patricio_Mac_Allister.html", "Carlos_Peucelle.html", "Carlos_Ponce.html", "Carlos_R_Rodriguez.html", "Carlos_Redondo.html", "Carlos_Roa.html", "Carlos_Rodriguez.html", "Carlos_Rodriguez_Jose_Antonio_Romero_Feris.html", "Carlos_Rubén_Saravia.html", "Carlos_Ruiz_Gutierrez.html", "Carlos_Russo.html", "Carlos_Salas.html", "Carlos_Schamberger.html", "Carlos_Sebastián_Galvan.html", "Carlos_Silva.html", "Carlos_Silvera.html", "Carlos_Tapia.html", "Carlos_Tevez.html", "Carlos_Valderrama.html", "Carlos_Vazquez.html", "Carlos_Zaragoza.html", "Carmelo_Cedrun.html", "Carmelo_Daniel_Villalba.html", "Carmelo_Micciche.html", "Carmelo_Ruscito.html", "Carmelo_Valencia.html", "Carmelo_Villalba.html", "Caroline_Graham_Hansen.html", "Castello_Lukeba.html", "Cathinka_Tandberg.html", "Cavenaghi.html", "Cecilio_Galeano.html", "Cedric_Don.html", "Cedric_Hatenboer.html", "Cedrick_Mabwati.html", "Celestino_dos_Santos.html", "Celso_Antonio_Freyre.html", "Celso_António_Paschoalotto.html", "Celso_Ayala.html", "Celso_Ayala_Gavilan.html", "Celso_Luís_Sousa_Nacrel.html", "Celso_Rafael_Ayala.html", "Celso_Santiago_de_Sousa.html", "Cesar_Fabian_Zabala.html", "Cesar_Lapaglia.html", "Cesar_Leyva.html", "Cesar_Orlando_Labarre.html", "Chafik_Abbas.html", "Chamito_Alfandega.html", "Chancel_Mbemba.html", "Charaf_Boutellaa.html", "Charif_Oudjani.html", "Charles-Édouard_Coridon.html", "Charles_De_Ketelaere.html", "Charles_Elie_Laprevotte.html", "Charlie_Cresswell.html", "Cheick_Oumar_Diakite.html", "Chems_Edine_Chnitif.html", "Chovanie_Amatkarijo.html", "Chris_Rigg.html", "Chris_Waddle.html", "Christian_Akselman.html", "Christian_Bassedas.html", "Christian_Baumgartner.html", "Christian_Cardoso.html", "Christian_Diaz.html", "Christian_Gomis.html", "Christian_Henna.html", "Christian_Javier_Trapasso.html", "Christian_Leonel_Diaz.html", "Christian_Makoun.html", "Christian_Pavon.html", "Christian_Perez.html", "Christian_Zajakowski.html", "Christiane_Endler.html", "Christophe_Ajas.html", "Christophe_Avril.html", "Christophe_Baiocco.html", "Christophe_Breton.html", "Christophe_Cocard.html", "Christophe_Deguerville.html", "Christophe_Delmotte.html", "Christophe_Dugarry.html", "Christophe_Galtier.html", "Christophe_Gardie.html", "Christophe_Horlaville.html", "Christophe_Lagrange.html", "Christophe_Messager.html", "Christophe_Metais.html", "Christophe_Ohrel.html", "Christophe_Pignol.html", "Christophe_Point.html", "Christophe_Rempp.html", "Christophe_Revault.html", "Christophe_Robert.html", "Christophe_Rémy.html", "Christophe_Sanchez.html", "Christophe_Vialet.html", "Christopher_Nkunku.html", "Christopher_Wreh.html", "Chérif_Oudjani.html", "Ciro_José_da_Costa.html", "Clarence_Awoudor.html", "Clarence_Seedorf.html", "Claude-Arnaud_Rivenet.html", "Claude_Barrabe.html", "Claude_Barret.html", "Claude_Dambury.html", "Claude_Fichaux.html", "Claude_Lowitz.html", "Claude_Makelele.html", "Claude_Massa.html", "Claude_Michel.html", "Claude_Puel.html", "Claudio_Adrian_Cristofanelli.html", "Claudio_Alberto_Galvagni.html", "Claudio_Alberto_Morresi.html", "Claudio_Alberto_Scalise.html", "Claudio_Alejandro_Rivadero.html", "Claudio_Anibal_Osterrieth.html", "Claudio_Argueso.html", "Claudio_Arzeno.html", "Claudio_Baravane.html", "Claudio_Biaggio.html", "Claudio_Borghi.html", "Claudio_Bozok.html", "Claudio_Cabrera.html", "Claudio_Caniggia.html", "Claudio_Cristofanelli.html", "Claudio_Crocco.html", "Claudio_Daniel_Borghi.html", "Claudio_Daniel_Borghi_2.html", "Claudio_Daniel_Rojas.html", "Claudio_Darío_Biaggio.html", "Claudio_David_Di_Pascua.html", "Claudio_Di_Natale.html", "Claudio_Dykstra.html", "Claudio_Enria.html", "Claudio_Estanislao_Sánchez.html", "Claudio_Etcheverri.html", "Claudio_Ezequiel_Argüeso.html", "Claudio_Fernando_Graf.html", "Claudio_Fernando_Ubeda.html", "Claudio_Filosa.html", "Claudio_Galvagni.html", "Claudio_Garcia.html", "Claudio_Grafe.html", "Claudio_Gugnali.html", "Claudio_Gustavo_Portillo.html", "Claudio_Husain.html", "Claudio_Isassa.html", "Claudio_Javier_López.html", "Claudio_Jeannoteguy.html", "Claudio_Lacosegliaz.html", "Claudio_Larramendi.html", "Claudio_Leonardo_Rodriguez.html", "Claudio_Marangoni.html", "Claudio_Marcelo_Morena.html", "Claudio_Marini.html", "Claudio_Martín_Biaggio.html", "Claudio_Martín_Cabrera.html", "Claudio_Martín_Espinosa.html", "Claudio_Mele.html", "Claudio_Milozzi.html", "Claudio_Morresi.html", "Claudio_Nigretti.html", "Claudio_Omar_Garcia.html", "Claudio_Oscar_Marangoni.html", "Claudio_Paris.html", "Claudio_Paul_Caniggia.html", "Claudio_Paul_Caniggia_Boca_Juniors.html", "Claudio_Rivadero.html", "Claudio_Scalise.html", "Claudio_Spinelli.html", "Claudio_Sponton.html", "Claudio_Taffarel.html", "Claudio_Ubaldo_Chena.html", "Claudio_Ubeda.html", "Claudio_Vicente_Santoro.html", "Claudio_Vidal.html", "Claudio_Zacarias.html", "Clemente_Rodriguez.html", "Clinton_Nsiala.html", "Clive_Allen.html", "Cláudio_Ibraim_Vaz_Leal.html", "Clément_Garcia.html", "Cole_Palmer.html", "Colin_Dagba.html", "Colombia_PrimeraA_2026_ESN.html", "Conrad_Harder.html", "Corentin_Martins.html", "Cosme_Zaccanti.html", "Couhaib_Driouech.html", "Cristian_Adrián_Leiva.html", "Cristian_Alberto_Fabbian.html", "Cristian_Alberto_González.html", "Cristian_Alfaro_Gonzalez.html", "Cristian_Andres_Sabir.html", "Cristian_Binetti.html", "Cristian_Cejas.html", "Cristian_Centeno.html", "Cristian_Cipolatti.html", "Cristian_Daniel_Colusso.html", "Cristian_Daniele.html", "Cristian_Diaz.html", "Cristian_Edgardo_Domizi.html", "Cristian_Eduardo_Giménez.html", "Cristian_Enrique_Ruffini.html", "Cristian_Favre.html", "Cristian_Ferreyra.html", "Cristian_Gabriel_Torres.html", "Cristian_Leonardo_Pitton.html", "Cristian_Medina.html", "Cristian_Molina.html", "Cristian_Orozco.html", "Cristian_Pitaluga.html", "Cristian_Traverso.html", "Cristiano_Paulo_Vieira_Pereira.html", "Cristiano_Ronaldo.html", "Cristiano_Zanetti.html", "Cristián_Castillo.html", "Cristián_Dollberg.html", "Cristián_Gastón_Zermatten.html", "Cristián_Guaita.html", "Cristián_La_Grotteria.html", "Cross_League_LOG_Glossary.html", "Cucho_Hernandez.html", "Cvitanich.html", "Cyril_Aloisio.html", "Cyril_L'Helgoualch.html", "Cyril_Rool.html", "Cyril_Serredszum.html", "Cyrille_Magnier.html", "Cyrille_Makanaky.html", "Cyrille_Pouget.html", "Cyrisque_Didaux.html", "Cédric_Anselin.html", "Cédric_Bardon.html", "Cédric_Carrez.html", "Cédric_Daury.html", "Cédric_Mouret.html", "Cédric_Pardeilhan.html", "César_Alfredo_Velazquez.html", "César_Almada.html", "César_Antonio_Laciar.html", "César_Couceiro.html", "César_Gomez.html", "César_Gonçalves_de_Brito.html", "César_Huerta.html", "César_J_Vega.html", "César_Leonardo_Torres.html", "César_Loza.html", "César_Mendoza.html", "César_Monasterio.html", "César_Oscar_Paiber.html", "César_Osvaldo_La_Paglia.html", "César_Payovich_Perez.html", "César_Roberto_Mendoza.html", "César_Rodrigues_da_Silva.html", "César_Romero.html", "César_Velazquez_Cuenca.html", "César_Venier.html", "Cézary_Tobollik.html", "Daan_Rots.html", "Daisuke_Yokota.html", "Dalcio_Giovagnoli.html", "Daley_Blind.html", "Damian_Alejandro_Maltagliatti.html", "Damian_Manusovich.html", "Damiano_Tommasi.html", "Damion_Downs.html", "Damir_Ceter.html", "Damián_Alarcon.html", "Damián_Facciuto.html", "Damián_Gonzalo_Faciutto.html", "Damián_Maltagliati.html", "Damián_Manso.html", "Damián_Manusovich.html", "Damián_Rivas_Karlic.html", "Damián_Teres.html", "Damián_Yañez.html", "Dan_Petersen.html", "Daniel_Adolfo_Sperandio.html", "Daniel_Ahmed.html", "Daniel_Alberto_Gonzalez_Veron.html", "Daniel_Alberto_Romero_Ergo.html", "Daniel_Alberto_Tilger.html", "Daniel_Alejandro_Delfino.html", "Daniel_Alejandro_Stremiz.html", "Daniel_Andrés_Mieres.html", "Daniel_Antonio_Gonzalez.html", "Daniel_Bertoni.html", "Daniel_Bravo.html", "Daniel_Bustos.html", "Daniel_Cravero.html", "Daniel_Diaz.html", "Daniel_Dobrik.html", "Daniel_Dupuy.html", "Daniel_Dutuel.html", "Daniel_Eduardo_Ibarra.html", "Daniel_Ergo.html", "Daniel_Fabio_Andrada.html", "Daniel_Fagiani.html", "Daniel_Fernandez.html", "Daniel_Fernando_Faggiani.html", "Daniel_Fernando_Peinado.html", "Daniel_Florencio_Sanchez.html", "Daniel_Fortes_Pinho.html", "Daniel_G_De_Los_Santos.html", "Daniel_Godoy.html", "Daniel_Gustavo_Cangialosi.html", "Daniel_Gustavo_Mercado.html", "Daniel_Humberto_Amaya.html", "Daniel_Héctor_Pin.html", "Daniel_Jose_Wermer.html", "Daniel_Juarez.html", "Daniel_Kesman.html", "Daniel_Kranczyk.html", "Daniel_Leopoldes.html", "Daniel_Loyola.html", "Daniel_Lucio_Alonso.html", "Daniel_Luis_Kuchen.html", "Daniel_Marcelo_Mayo.html", "Daniel_Martinez.html", "Daniel_Munoz.html", "Daniel_Nuñez.html", "Daniel_Oscar_Garnero.html", "Daniel_Oscar_Gazzaniga.html", "Daniel_Oscar_Leani.html", "Daniel_Oscar_Rus.html", "Daniel_Osvaldo_Amarilla.html", "Daniel_Osvaldo_Fernandez.html", "Daniel_Osvaldo_Riquelme.html", "Daniel_Osvaldo_Sosa.html", "Daniel_Passarella.html", "Daniel_Pereyra.html", "Daniel_Pighin.html", "Daniel_Riquelme.html", "Daniel_Roberto_Lezcano.html", "Daniel_Rodriguez.html", "Daniel_Sperandio.html", "Daniel_Steres.html", "Daniel_Valencia.html", "Daniel_Walter_Oldra.html", "Daniel_Willington.html", "Daniel_Xuereb.html", "Danilo_Baltierra.html", "Danilo_Tosello.html", "Dannes_Coronel.html", "Danny_Blind.html", "Dante_Fernandez.html", "Dante_Unali.html", "Dante_Zanotti.html", "Dany_L'Hoste.html", "Dany_Mota.html", "Danylo_Sikan.html", "Dario_Andres_Siviski.html", "Dario_Christian_Domene.html", "Dario_Javier_Franco.html", "Dario_Norberto_Decoud.html", "Dario_Osorio.html", "Darwin_Wilson_Varela.html", "Darío_Agustín_Ubriaco.html", "Darío_Cabrol.html", "Darío_Castelli.html", "Darío_Cavallo.html", "Darío_Cristian_Domene.html", "Darío_Fabbro.html", "Darío_Figueroa.html", "Darío_Gabriel_Silenzi.html", "Darío_Grioni.html", "Darío_Husain.html", "Darío_Ortiz.html", "Darío_Rubén_Marra.html", "Darío_Scotto.html", "Darío_Siviski.html", "Darío_Victorio_Brane.html", "Dastan_Satpayev.html", "David_Aguy.html", "David_Beckham.html", "David_Brokers.html", "David_Brooks.html", "David_Cancola.html", "David_Carlos_Nazareno_Bisconti.html", "David_Castilla.html", "David_Coulibaly.html", "David_Crespo_Zurita.html", "David_De_Gea.html", "David_Delbarre.html", "David_Denquin.html", "David_Fanzel.html", "David_Garcion.html", "David_Ginola.html", "David_Guion.html", "David_Hodgson.html", "David_Jemmali.html", "David_Klein.html", "David_Luchetti.html", "David_Manuel_Reis_e_Silva.html", "David_Marraud.html", "David_Mazzoncini.html", "David_Merdy.html", "David_Otorbi.html", "David_Perez.html", "David_Raum.html", "David_Regis.html", "David_Rinçon.html", "David_Robert.html", "David_Saint-Guily.html", "David_Terrier.html", "David_Trezeguet.html", "David_Trivino.html", "David_Voisin.html", "David_Weir.html", "David_Zitelli.html", "Davide_Bartesaghi.html", "Davide_Frattesi.html", "Davis_Opoku.html", "Davor_Suker.html", "Davy_Roef.html", "DeJuan_Jones.html", "De_Bruyne.html", "Dean_Huijsen.html", "Debinha.html", "Debray_Darío_Silva.html", "Deco.html", "Deiber_Caicedo.html", "Deividas_Cesnaukis.html", "Dejan_Stankovic.html", "Deminul_Fersati.html", "Denis_Abed.html", "Denis_Armbruster.html", "Denis_Gerval.html", "Denis_Law.html", "Denis_Videnovic.html", "Dennis_Bergkamp.html", "Dennis_Gyamfi.html", "Dennis_Man.html", "Dennis_Seimen.html", "Derek_Gebhard.html", "Derek_Waldeck.html", "Desire_Doue.html", "Devis_Opoku.html", "Diaby_Sekana.html", "Diamantino_Tomé_Figueiredo.html", "Diamantino_dos_Reis_Brito.html", "Didi.html", "Didier_Casini.html", "Didier_Danio.html", "Didier_Deschamps.html", "Didier_Domi.html", "Didier_Drogba.html", "Didier_Dubois.html", "Didier_Lang.html", "Didier_Monczuk.html", "Didier_Otokore.html", "Didier_Otonore.html", "Didier_Philippe.html", "Didier_Santini.html", "Didier_Sénac.html", "Didier_Thimothée.html", "Didier_Tholot.html", "Diego_Alarcon.html", "Diego_Andrés_Demarco.html", "Diego_Antonio_Canepa.html", "Diego_Aníbal_Perez.html", "Diego_Armando_Maradona.html", "Diego_Armando_Maradona_Boca_Juniors.html", "Diego_Arturo_Tito.html", "Diego_Bonino.html", "Diego_Bustos.html", "Diego_Cagna.html", "Diego_Cagna_2.html", "Diego_Capria_Labiste.html", "Diego_Carneiro_Nascimento.html", "Diego_Castagno_Suarez.html", "Diego_Comelles.html", "Diego_Crosa.html", "Diego_Da_Silva.html", "Diego_Damián_Carrizo.html", "Diego_Dias_Junior.html", "Diego_Diaz.html", "Diego_Dorta_Montes.html", "Diego_Duarte.html", "Diego_Edgardo_Cuccioletti.html", "Diego_Enrique_Cerro.html", "Diego_Fernandez.html", "Diego_Fernando_Corpache.html", "Diego_Fernando_Latorre.html", "Diego_Figueroa.html", "Diego_Forlan.html", "Diego_Gabriel_Ceballos.html", "Diego_Germano.html", "Diego_Gil.html", "Diego_Gustavo_Diaz.html", "Diego_Latorre.html", "Diego_Luis_Soñora.html", "Diego_Luque.html", "Diego_Manuel_Figueroa.html", "Diego_Maradona.html", "Diego_Martín_Cocca.html", "Diego_Martín_Dorta.html", "Diego_Miguel_Frattini.html", "Diego_Mosset.html", "Diego_Ordoñez.html", "Diego_Oscar_Monarriz.html", "Diego_Oyola.html", "Diego_Pablo_Simeone.html", "Diego_Padula.html", "Diego_Quintana.html", "Diego_Raúl_Capria.html", "Diego_Rodolfo_Placente.html", "Diego_Segovia.html", "Diego_Segovia_2.html", "Diego_Simeone.html", "Diego_Yañez.html", "Diego_Zeballos.html", "Dies_Janse.html", "Dieumerci_Mbokani.html", "Dinis_da_Silva_Gomes_Rosendo.html", "Dino_Zoff.html", "Diogo_Fernandes.html", "Dionisio_Gutierrez.html", "Dirk_Kuyt.html", "Disley_Sekana.html", "Djamel_Belmadi.html", "Djamel_Djellal.html", "Djibril_Diawara.html", "Djylian_Nguessan.html", "Djézon_Boutoille.html", "Doctor_Teofilus_Khumalo.html", "Domantino_Manuel_F._Miranda.html", "Domingo_Acevey.html", "Domingo_Irala_Sarabia.html", "Domingos_Da_Guia.html", "Domingos_José_Paciência_Oliveira.html", "Dominic_Calvert_Lewin.html", "Dominik_Kotarski.html", "Dominique_Aulanier.html", "Dominique_Barberat.html", "Dominique_Bijotat.html", "Dominique_Casagrande.html", "Dominique_Corroyer.html", "Dominique_Dropsy.html", "Dominique_Franchi.html", "Dominique_Leclerc.html", "Dominique_Lefebvre.html", "Dominique_Moubeke.html", "Dominique_Murati.html", "Dominique_Rocheteau.html", "Dominique_Thomas.html", "Don_Deedson.html", "Donato.html", "Dragan_Jakovljevic.html", "Dragan_Stojkovic.html", "Dragisa_Gudelj.html", "Dragoljub_Brnovic.html", "Dreyffus_Cordeiro_Filho.html", "Dro_Fernandez.html", "Duk.html", "Dunga.html", "Dusan_Savic.html", "Dusan_Vlahovic.html", "Dwight_Merrick.html", "Dylan_Scicluna.html", "Décio_António_Carraça.html", "Décio_Paulo_Frade_Barroso.html", "Décio_de_Aires.html", "EMPIRE_FGA_RAAL_LaLouviere_Report_v2.1.html", "Eba_Bekir_is.html", "Eddy_Bathié.html", "Eddy_Bonjour.html", "Eddy_Capron.html", "Ederson_Moraes.html", "Edgar_Borges.html", "Edgar_Davids.html", "Edgar_Ruibilne_Paz_Lima.html", "Edgardo_Alberto_Adinolfi.html", "Edgardo_Bauza.html", "Edgardo_Bauza_Rosario.html", "Edgardo_Fabio_Boujon.html", "Edgardo_Fabián_Pratola.html", "Edgardo_Fuillerat.html", "Edgardo_José_La_Fata.html", "Edgardo_Norberto_Bauza.html", "Edgardo_Pascual_Mazzeo.html", "Edgardo_Perna.html", "Edinson_Cavani.html", "Edison_Echeveste.html", "Edisson_Jordanov.html", "Edivaldo_Pita.html", "Edmilson_Dias_Lucena.html", "Edmundo_Joaquim_Pascoal_da_Silva.html", "Eduard_Streltsov.html", "Eduardho_Marcante.html", "Eduardo_Bennett.html", "Eduardo_Berizzo.html", "Eduardo_Berizzo_2.html", "Eduardo_Berizzo_River_Plate.html", "Eduardo_Bustos_Montoya.html", "Eduardo_Castro.html", "Eduardo_Coppola.html", "Eduardo_Coudet.html", "Eduardo_Da_Silva.html", "Eduardo_Delgado.html", "Eduardo_Fabian_Koleff.html", "Eduardo_Fuentes.html", "Eduardo_Germán_Coudet.html", "Eduardo_Gonzalez.html", "Eduardo_Hernandez.html", "Eduardo_J.G._Camazolo_Mendes.html", "Eduardo_Jorge_Favaro.html", "Eduardo_José_Morales.html", "Eduardo_Luís_Marques_Kraus_Gomes.html", "Eduardo_Magnin.html", "Eduardo_Maldonado.html", "Eduardo_Marcelino_Lopes.html", "Eduardo_Marcelo_Priede.html", "Eduardo_Nicolás_Tuzzio.html", "Eduardo_Pereira.html", "Eduardo_Roberto_Sanchez.html", "Eduardo_Romani.html", "Eduardo_Sanchez.html", "Eduardo_Saporiti.html", "Eduardo_Sisca.html", "Eduardo_Smith.html", "Eduardo_Stehlik.html", "Eduardo_Tuzzio.html", "Eduardo_Vargas.html", "Edvardsen.html", "Edwin_Quarshie_EmpireFGA.html", "Edwin_van_der_Sar.html", "Edwuin_Cetré.html", "Eemeli_Honkola.html", "Efe_Ugiagbe.html", "Eino_Pitkala.html", "El_Bitshiabu.html", "El_Grafico_Anuario_97_Apertura.html", "Elhen_Martins_Pires.html", "Elias_Achouri.html", "Elias_Figueroa.html", "Elies_Mahmoud.html", "Elijah_Gift.html", "Elijah_Just.html", "Elio_Hernán_Lopez.html", "Elio_Rodriguez.html", "Eliseo_Mouriño.html", "Eliseo_Rivero.html", "Elkiya_Legros.html", "Elseid_Hysaj.html", "Elvio_Vazquez.html", "Elye_Wahi.html", "Elías_Coronel.html", "Emanuel_Henrique_Teixeira_Marques.html", "Emanuel_Ruiz.html", "Emanuel_dos_Santos.html", "Emerson.html", "Emerson_Machado_Ivontsch.html", "Emil_Konradsen_Ceide.html", "Emil_Weihe_Joensen.html", "Emiliano_Rey.html", "Emiliano_Romay.html", "Emilio_Butragueno.html", "Emilio_Comisso.html", "Emilio_Valencia.html", "Emilio_Ycaza.html", "Emir_Azemovic.html", "Emmanuel_Blanchard.html", "Emmanuel_Hutteau.html", "Emmanuel_Huttreau.html", "Emmanuel_Petit.html", "Emre_Gokay.html", "Emílio_Araújo_Filho.html", "Endrick.html", "Enric_Llansana.html", "Enrico_Chiesa.html", "Enrico_Monteiro_Gomes.html", "Enrique_Angel_Saravia.html", "Enrique_B_Ferraro.html", "Enrique_Borrelli.html", "Enrique_Ezequiel_Borrelli.html", "Enrique_Hrabina.html", "Enrique_José_De_Bellis.html", "Enrique_M_Angellotti.html", "Enrique_Nieto.html", "Enrique_Olivera.html", "Enrique_Oscar_Hrabina.html", "Enrique_Primerano.html", "Enrique_Roberto_Nieto.html", "Enrique_Sanchez.html", "Enrique_Verduga.html", "Enrique_Vidalle.html", "Enzo_Alves.html", "Enzo_Diaz.html", "Enzo_Francescoli.html", "Enzo_Francescoli_Uriarte.html", "Enzo_Javier_Azambuja.html", "Enzo_Kost.html", "Enzo_Molebe.html", "Enzo_Noce.html", "Enzo_Roberto_Gorniak.html", "Enzo_Scifo.html", "Enzo_Trossero.html", "Erasmo_Doroni.html", "Erasmo_de_Oliveira_da_Silva.html", "Eredivisie_2025_2026_ESN.html", "Eric_Assadourian.html", "Eric_Bala.html", "Eric_Bertrand.html", "Eric_Black.html", "Eric_Cantona.html", "Eric_Clavelloux.html", "Eric_Denizart.html", "Eric_Dewilder.html", "Eric_Di_Meco.html", "Eric_Dufournet.html", "Eric_Geraldes.html", "Eric_Guérit.html", "Eric_Lada.html", "Eric_Martel.html", "Eric_Martin.html", "Eric_Meyrieu.html", "Eric_Mura.html", "Eric_Otieno.html", "Eric_Prissette.html", "Eric_Péan.html", "Eric_Sikora.html", "Eric_Villa.html", "Erick_Nunes.html", "Erico_Castro.html", "Erling_Haaland.html", "Ernesto_Corti.html", "Ernesto_Enrique_Corti.html", "Ernesto_Gomez.html", "Ernesto_Júlio_M._da_Silva_Fernandes.html", "Ernesto_Pereyra.html", "Ernst_Atis-Clotaire.html", "Ernst_Ocwirk.html", "Erwan_Madihi.html", "Erwann_Manach.html", "Erwin_Koeman.html", "Erwin_Vandenbergh.html", "Esmir_Bajraktarevic.html", "Estanislao_Ayuso.html", "Esteban_Ernesto_Pogany.html", "Esteban_Fernando_Gonzalez.html", "Esteban_Fuertes.html", "Esteban_Ros.html", "Estevao_William.html", "Estéban_A_Massa.html", "Estéban_Gonzalez.html", "Estéban_Pogany.html", "Ethan_Ampadu.html", "Ethan_Nwaneri.html", "Etienne_Mendy.html", "Eugene_Kabongo.html", "Eugenio_Purita.html", "Eugenio_Ricardo_Chiappero.html", "Eumelio_Ramón_Palacios.html", "Euro_1988.html", "Eusebio.html", "Eusebio_Espinola.html", "Eusebio_Espinola_2.html", "Eusebio_Roldan.html", "Eusébio_António_Teixeira_Pinto.html", "Evan_Bush.html", "Evan_Diamalunda.html", "Evan_Le_Gall.html", "Evander.html", "Everton_Nogueira.html", "Everton_Ribeiro.html", "Ewa_Pajor.html", "Ewandro_Costa.html", "Ezechiel_Banzuzi.html", "Ezequiel_Amaya.html", "Ezequiel_Piovi.html", "Ezequiel_Ramiro_Bustos.html", "Fabian_Alberto_Garfagnoli.html", "Fabian_Ariel_Suescun.html", "Fabian_Hector_Biazotti.html", "Fabian_O_Neill.html", "Fabian_Oscar_Cancelarich.html", "Fabian_Oscar_Luna.html", "Fabiano_Pereira.html", "Fabien_Barthez.html", "Fabien_Cool.html", "Fabien_Debotte.html", "Fabien_Leclercq.html", "Fabien_Lefèvre.html", "Fabien_Piveteau.html", "Fabien_Safanjon.html", "Fabio_Alberto_Moreyra.html", "Fabio_Andrada.html", "Fabio_Gimenez.html", "Fabio_Javier_Radaelli.html", "Fabio_Lenguita.html", "Fabio_Mario_Talarico.html", "Fabio_Miguel_Gimenez.html", "Fabio_Norberto_Marozzi.html", "Fabio_Roldan.html", "Fabio_Silva.html", "Fabio_Sommella.html", "Fabio_Spotorno.html", "Fabio_Talarico.html", "Fabián_Alberto_Vazquez.html", "Fabián_Armando_Basualdo.html", "Fabián_Basualdo.html", "Fabián_Berza.html", "Fabián_Bohnhoff.html", "Fabián_Cancelarich.html", "Fabián_Carrizo.html", "Fabián_Castro.html", "Fabián_Coito.html", "Fabián_Fernandez.html", "Fabián_Garcia.html", "Fabián_Gustavo_Carrizo.html", "Fabián_Leonardo_Itabel.html", "Fabián_Olivera.html", "Fabián_Orlando_Peralta.html", "Fabián_Vazquez.html", "Fabrice_Correia.html", "Fabrice_Divert.html", "Fabrice_Grondin.html", "Fabrice_Henry.html", "Fabrice_Leclercq.html", "Fabrice_Lepaul.html", "Fabrice_Lokembo_Lokaso.html", "Fabrice_Mannucci.html", "Fabrice_Moreau.html", "Fabrice_Mège.html", "Fabrice_Poullain.html", "Fabricio_Coloccini.html", "Fabricio_Fuentes.html", "Facundo_Bruera.html", "Facundo_Pellistri.html", "Facundo_Sava.html", "Facundo_Sosa.html", "Facundo_Villalba.html", "Fanicet_Conte.html", "Faruk_Hadzibegic.html", "Faryd_Camilo_Mondragon.html", "Faryd_Mondragon.html", "Faryd_Mondragon_Ali.html", "Faustino_Asprilla.html", "Fausto_Vera.html", "Favio_Damián_Fernández.html", "Favio_Marquez.html", "Favio_Nigro.html", "Fedde_De_Jong.html", "Federico_Basavilbaso.html", "Federico_Basavilbaso_Club_Atletico_Espanol.html", "Federico_Basavilbaso_San_Lorenzo.html", "Federico_Bessone.html", "Federico_Chiesa.html", "Federico_Dimarco.html", "Federico_Dominguez.html", "Federico_Edwards.html", "Federico_Guillermo_Lussenhoff.html", "Federico_Higuain.html", "Federico_Lagorio.html", "Federico_Steffanoni.html", "Federico_Tarabini.html", "Federico_Valverde.html", "Felipe_Adrián_Bellini.html", "Felipe_Bellini.html", "Felipe_Daniel_Revelez.html", "Felipe_Di_Marco.html", "Felipe_Di_Marco_2.html", "Felix_Benito.html", "Felix_Dario_Leon.html", "Ferenc_Meszaros.html", "Ferenc_Puskas.html", "Fernanda_Ferreira_de_Assis.html", "Fernando_A_Kanapkis.html", "Fernando_Adrián_Blanco.html", "Fernando_Alvaro_Picun.html", "Fernando_Andrés_Gamboa.html", "Fernando_Ariel_Batista.html", "Fernando_Aílson_Sousa_Chalana.html", "Fernando_Caceres.html", "Fernando_Calbanese.html", "Fernando_Cordoba.html", "Fernando_D'Amico.html", "Fernando_Daniel_Calcaterra.html", "Fernando_Dario_De_Llano.html", "Fernando_Di_Carlo.html", "Fernando_E_Correa.html", "Fernando_Edgar_Galetto.html", "Fernando_Elias_Oliveira_da_Silva.html", "Fernando_Fabian_Lanzidei.html", "Fernando_G_Pintos.html", "Fernando_Gabriel_Caceres.html", "Fernando_Gabriel_Calbanese.html", "Fernando_Gabriel_Telesca.html", "Fernando_Gago.html", "Fernando_Galetto.html", "Fernando_Gatti.html", "Fernando_Gimenez.html", "Fernando_Gustavo_Sergio_Marro.html", "Fernando_Harry_Alvez.html", "Fernando_Hierro.html", "Fernando_Jorge_Ferreira_Pires.html", "Fernando_José_Ferreira_Vicente.html", "Fernando_Kanapkis.html", "Fernando_Kuyumchoglu.html", "Fernando_Lanzidei.html", "Fernando_Manuel_Antunes_Nendes.html", "Fernando_Manuel_Seixas_Pereira.html", "Fernando_Manuel_Sousa_Zavelino.html", "Fernando_Meireles.html", "Fernando_Mendes_Soares_Gomes.html", "Fernando_Moner.html", "Fernando_Moreira_Gonçalves.html", "Fernando_Morena.html", "Fernando_Muslera.html", "Fernando_Nendes_Cruz.html", "Fernando_Neves_Costa_Guimarães.html", "Fernando_Nuno_da_Costa_Gonçalves.html", "Fernando_Pandolfi.html", "Fernando_Perezlindo.html", "Fernando_Quiroz.html", "Fernando_Ramello.html", "Fernando_Raúl_Baleato.html", "Fernando_Redondo.html", "Fernando_Restinho.html", "Fernando_Rodriguez.html", "Fernando_Rosa.html", "Fernando_Saraiba.html", "Fernando_Silva.html", "Fernando_Veron.html", "Fernando_Vilar.html", "Fernando_W_Carballo.html", "Fernando_Zappia.html", "Fernando_Óscar_Bandeirinha_Barbosa.html", "Ferran_Torres.html", "Ferrety_Sousa.html", "Fidel_Inolopú(spanish).html", "Filip_Bundgaard.html", "Filipe_Aguiar.html", "Filipe_Luis_Kasmirski.html", "Filippo_Inzaghi.html", "Filippo_Ranocchia.html", "Finn_Laudrup.html", "Fisnik_Asllani.html", "Fitz-Jim.html", "Flavio_Cuca.html", "Flavio_Fioritti.html", "Flavio_Gabriel_Zandona.html", "Flavio_Ivanovic.html", "Flavio_Zandona.html", "Florent_Laville.html", "Florian_Danho.html", "Florian_Maurice.html", "Floris_Schaap.html", "Flávio_José_das_Neves.html", "Fran_Gonzalez.html", "Francelino_Lopes.html", "Francesco_Antonioli.html", "Francesco_Camarda.html", "Francesco_Pio_Esposito.html", "Francesco_Totti.html", "Francesco_Varallo.html", "Francis_De_Vries.html", "Francis_Gillot.html", "Francis_Llacer.html", "Francis_Samba.html", "Francisc_Dican.html", "Francisco_Almeida_Spencer.html", "Francisco_C._A._S._Oliveira.html", "Francisco_Carlos.html", "Francisco_Carrasco.html", "Francisco_Dinis_Lopes_Ribeiro_Fontão.html", "Francisco_Fortes_Calvo.html", "Francisco_Gento.html", "Francisco_Guerrero.html", "Francisco_II_Conde_Junior.html", "Francisco_J._N._Costa.html", "Francisco_José_R._Gonçalves.html", "Francisco_José_Teles_Andrade.html", "Francisco_José_da_Costa_Sauna.html", "Francisco_José_de_Nides_Agatão.html", "Francisco_Llorente.html", "Francisco_M._E._Moreira.html", "Francisco_Manuel_Crisanto_Rodrigues.html", "Francisco_P._da_Silva_Vieira.html", "Francisco_S._Pereira_da_Silva.html", "Franck_Boschetti.html", "Franck_Burnier.html", "Franck_Dumas.html", "Franck_Durix.html", "Franck_Fontan.html", "Franck_Gava.html", "Franck_Granger.html", "Franck_Histilloles.html", "Franck_Jurietti.html", "Franck_Lebeuf.html", "Franck_Lucchesi.html", "Franck_Mantaux.html", "Franck_Meyrignac.html", "Franck_Passi.html", "Franck_Priou.html", "Franck_Rabarivony.html", "Franck_Renou.html", "Franck_Rizzetto.html", "Franck_Robin.html", "Franck_Sauzée.html", "Franck_Silvestre.html", "Franck_Soler.html", "Franck_Tanasi.html", "Franck_Turpin.html", "Franck_Vandecasteele.html", "Franco_Baresi.html", "Franco_Fagundez.html", "Franco_Mastantuono.html", "Franco_Navarro.html", "Franco_Vignola.html", "Frank_Burnier.html", "Frank_Lampard.html", "Frank_Leboeuf.html", "Frank_Pingel.html", "Frank_Rijkaard.html", "Frank_Soler.html", "Frank_Yallop.html", "Frank_Zambo_Anguissa.html", "Frankie_Vercauteren.html", "Frankie_Westfield.html", "Franz_Beckenbauer.html", "François_Brisson.html", "François_Caffarel.html", "François_Calderaro.html", "François_Denis.html", "François_Grenet.html", "François_Lemasson.html", "François_Omam_Biyik.html", "François_Oman-Biyik.html", "François_Zahoui.html", "Freddy_Grisales.html", "Freddy_Rincon.html", "Frederico_Nobre_Rosa.html", "Frederik_Rieper.html", "Fredy_Montero.html", "Frenkie_De_Jong.html", "Fridolina_Rolfö.html", "Fritz_Walter.html", "Frédéric_Arpinon.html", "Frédéric_Brando.html", "Frédéric_Christen.html", "Frédéric_Da_Rocha.html", "Frédéric_Danjou.html", "Frédéric_Darras.html", "Frédéric_Dindeleux.html", "Frédéric_Dorraje.html", "Frédéric_Déhu.html", "Frédéric_Fouret.html", "Frédéric_Gioria.html", "Frédéric_Gueguen.html", "Frédéric_Guimard.html", "Frédéric_Lafond.html", "Frédéric_Machado.html", "Frédéric_Martin.html", "Frédéric_Mendy.html", "Frédéric_Meyrieu.html", "Frédéric_Patouillard.html", "Frédéric_Petereyns.html", "Frédéric_Pons.html", "Félix_Ismael_Pereyra.html", "Félix_Lacuesta.html", "Félix_Ricardo_Torres.html", "Gabriel_Alejandro_Kinjo.html", "Gabriel_Alejandro_Marino.html", "Gabriel_Batistuta.html", "Gabriel_Biladi.html", "Gabriel_Caiaffa.html", "Gabriel_Calderon.html", "Gabriel_Casas.html", "Gabriel_Francisco_Schurrer.html", "Gabriel_Gervino.html", "Gabriel_Gustavo_Perrone.html", "Gabriel_Heinze.html", "Gabriel_Lettieri.html", "Gabriel_Loeschbor.html", "Gabriel_Magalhaes.html", "Gabriel_Mec.html", "Gabriel_Omar_Amato.html", "Gabriel_Omar_Batistuta.html", "Gabriel_Osvaldo_D'ascanio.html", "Gabriel_Pedrazzi.html", "Gabriel_Pereira.html", "Gabriel_Raúl_Camacho.html", "Gabriel_Vera.html", "Gabriel_Walter_Morena.html", "Gael_Gibert.html", "Gaetano_Scirea.html", "Galileo_Galilei_Percovich.html", "Gallardo.html", "Gareth_Bale.html", "Garrincha.html", "Gary_Lineker.html", "Gary_Speed.html", "Gassimou_Sylla.html", "Gaston_Mobati.html", "Gastón_Cortez.html", "Gastón_Pezzuti.html", "Gastón_Ricardo_Liendo.html", "Gastón_Sessa.html", "Gaudêncio_Bonfim_Sobrinho_Nardo.html", "Gautier_Ott.html", "Gaztelu.html", "Gaëtan_Huard.html", "Gedeon_Ndongo.html", "Gemelson.html", "Gemelson_Vieira.html", "Genaro_Alfano.html", "Geoffray_Toyes.html", "George_Best.html", "George_Finidi.html", "George_Ilenikhena.html", "George_Oppong_Manneh_Weah.html", "George_Weah.html", "Georges_Slavkov.html", "Georges_Weah.html", "Georgi_Kostadinov.html", "Geovany_Quenda.html", "Geraldo_Dutra_Pereira.html", "Gerardo_Cardone.html", "Gerardo_Damián_Rivero.html", "Gerardo_Daniel_Martino.html", "Gerardo_David_Gonzalez.html", "Gerardo_Ferrari.html", "Gerardo_G_Rodriguez.html", "Gerardo_Gabriel_Meijide.html", "Gerardo_Gonzalez.html", "Gerardo_Martin_Rojo.html", "Gerardo_Martino.html", "Gerardo_Reinoso.html", "Gerardo_Rojo.html", "Gerd_Muller.html", "Geremi_Njitap.html", "German_Burgos.html", "German_Gutierrez.html", "Germano_Joaquim_Estêvão_Santos.html", "Germán_Adrián_Ramón_Burgos.html", "Germán_Alejandro_Dianesi.html", "Germán_Barbieri.html", "Germán_Burgos.html", "Germán_Chiurco.html", "Germán_De_Santo.html", "Germán_Ferreyra.html", "Germán_Marcelo_Caceres.html", "Germán_Martellotto.html", "Germán_Noce.html", "Germán_Real.html", "Germán_Rivarola.html", "Gernot_Rohr.html", "Gerson.html", "Gheorghe_Hagi.html", "Gheorghe_Mihali.html", "Ghislain_Anselmini.html", "Giacinto_Facchetti.html", "Gianluca_Busio.html", "Gianluca_Prestianni.html", "Gianluca_Scamacca.html", "Gianluca_Simeone.html", "Gianluigi_Buffon.html", "Gianni_Michelini.html", "Gianni_Rivera.html", "Gift_Links.html", "Gilbert_Ceccarelli.html", "Gilberto_Angelucci.html", "Gilberto_Angelucci_Guion.html", "Gilberto_Angelucci_Guion_San_Lorenzo.html", "Gilberto_Angelucci_San_Lorenzo_De_Almagro.html", "Gilberto_Mora.html", "Gilberto_Yearwood.html", "Gilberto_dos_Santos_Gomes.html", "Gilles_Adrian.html", "Gilles_Barraque.html", "Gilles_Doucende.html", "Gilles_Frechingues.html", "Gilles_Giuliano.html", "Gilles_Grimandi.html", "Gilles_Hampartzoumian.html", "Gilles_Morisseau.html", "Gilles_Petrucci.html", "Gilles_Rousset.html", "Giorgian_De_Arrascaeta.html", "Giovani_Lo_Celso.html", "Giovanni Moreno.html", "Giovanni_Moreno.html", "Giovanni_Reyna.html", "Giovanni_Rocotelli.html", "Giovanni_Simeone.html", "Giovanny_Hernandez.html", "Giuliano Cerato.html", "Giuliano_Simeone.html", "Giuseppe_Meazza.html", "Giuseppe_Signori.html", "Givairo_Read.html", "Glenn_Hoddle.html", "Goncalo_Negrao.html", "Gonzalo_Ariel_Barranco.html", "Gonzalo_Belloso.html", "Gonzalo_Camilli_Toricez.html", "Gonzalo_Favre.html", "Gonzalo_Gaitan.html", "Gonzalo_Higuain.html", "Gonzalo_L_Diaz.html", "Gonzalo_Luis_Madrid.html", "Gonzalo_Vera.html", "Gonçalo_José_Gonçalves_Riedra_de_Nobre.html", "Gorak_Ghale.html", "Goran_Milojevic.html", "Goran_Pandurović.html", "Goran_Sorloth.html", "Gorka_Abascal.html", "Graham_Rix.html", "Gregor_Bajde.html", "Gregorio_Koleff.html", "Grégory_Coupet.html", "Gue_Sung_Cho.html", "Guedalia_Nsakala.html", "Gueorgui_Asparuhov.html", "Guido_Alvarenga_Torales.html", "Guido_Virgilio_Alvarenga.html", "Guilherme_Christino.html", "Guillaume_Bouisset.html", "Guillaume_Lopez.html", "Guillaume_Masson.html", "Guillaume_Odru.html", "Guillaume_Warmuz.html", "Guillermo_Alonso.html", "Guillermo_Barros_Schellotto.html", "Guillermo_Barros_Schelotto.html", "Guillermo_Daniel_Aldaz.html", "Guillermo_Daniel_Enrique_Primo.html", "Guillermo_Daniel_Rios.html", "Guillermo_Fabián_Nicosia.html", "Guillermo_Franco.html", "Guillermo_Guendulain.html", "Guillermo_Hernando.html", "Guillermo_Larrosa.html", "Guillermo_Luis_Franco.html", "Guillermo_Mario_Coppola.html", "Guillermo_Martín_Mazzuco.html", "Guillermo_Morigi.html", "Guillermo_Nuñez.html", "Guillermo_Oscar_Sanguinetti.html", "Guillermo_Pablo_Guendulain.html", "Guillermo_Rios.html", "Guillermo_Rivarola.html", "Guillermo_Rodriguez.html", "Guillermo_Rodriguez_2.html", "Guillermo_Sanguinetti_Giordano.html", "Guillermo_Zarate.html", "Guillermo_Zarate_2.html", "Guize_Medina.html", "Gunnar_Nordahl.html", "Guro_Reiten.html", "Gustav_Marcussen.html", "Gustavo_A._Carrasco.html", "Gustavo_Acosta.html", "Gustavo_Adolfo_Costas.html", "Gustavo_Adrián_Lombardi.html", "Gustavo_Adrián_Lopez.html", "Gustavo_Alberto_Juarez.html", "Gustavo_Alberto_Onaindia.html", "Gustavo_Alfredo_Neffa.html", "Gustavo_Andres_Zalazar.html", "Gustavo_Andrés_Sarli.html", "Gustavo_Antoun.html", "Gustavo_Ariel_Brandt.html", "Gustavo_Artaza.html", "Gustavo_Barros.html", "Gustavo_Barros_Schelotto.html", "Gustavo_Buena.html", "Gustavo_Campagnuolo.html", "Gustavo_Chacoma.html", "Gustavo_Costas.html", "Gustavo_Couto_Carrera.html", "Gustavo_Daniel_Da_Silva.html", "Gustavo_Daniel_Dornell.html", "Gustavo_Daniel_Ferlatti.html", "Gustavo_Daniel_Gomez.html", "Gustavo_Daniel_Tognarelli.html", "Gustavo_De_Pardo.html", "Gustavo_Dezzotti.html", "Gustavo_Dueña.html", "Gustavo_Eduardo_Castro.html", "Gustavo_Ernesto_Tempone.html", "Gustavo_Falaschi.html", "Gustavo_Germán_Gorsd.html", "Gustavo_Gherbi.html", "Gustavo_Giustozzi.html", "Gustavo_Grondona.html", "Gustavo_Hugo_Gonzalez.html", "Gustavo_Irusta.html", "Gustavo_Javier_Maciel.html", "Gustavo_Jones.html", "Gustavo_Jorge_Acosta.html", "Gustavo_Jose_Coronel.html", "Gustavo_Juan_Nikitiuk.html", "Gustavo_Juan_Spallina.html", "Gustavo_Juarez.html", "Gustavo_Lombardi.html", "Gustavo_Maciel.html", "Gustavo_Miguel_España.html", "Gustavo_Miguel_Zapata.html", "Gustavo_Moriconi.html", "Gustavo_Pedro_Echaniz.html", "Gustavo_Perrone.html", "Gustavo_Picabea.html", "Gustavo_Pinto_Cerqueira.html", "Gustavo_Piñero.html", "Gustavo_Puerta.html", "Gustavo_Quinteros.html", "Gustavo_Raggio.html", "Gustavo_Reggi.html", "Gustavo_Rezza.html", "Gustavo_Rubén_DE_LA_Llera.html", "Gustavo_Sandoval.html", "Gustavo_Siviero.html", "Gustavo_Szulz.html", "Gustavo_Tognarelli.html", "Gustavo_Torres.html", "Gustavo_W_Ferreira.html", "Gustavo_Yalve.html", "Gustavo_Zalazar.html", "Gustavo_Zapata.html", "Guus_Til.html", "Guy_Clavelloux.html", "Guy_Lacombe.html", "Guy_Mengual.html", "Guy_Menguel.html", "Guy_Mubart.html", "Gwenaël_Corbin.html", "Gyorgy_Bognar.html", "Gérald_Baticle.html", "Gérald_Di_Giorgio.html", "Gérald_Martin.html", "Gérald_Passi.html", "Gérard_Bernardet.html", "Gérard_Buscher.html", "Géza_Mészöly.html", "Hadj_Moussa.html", "Hadri_Radouane.html", "Haine_Eames.html", "Hakan_Calhanoglu.html", "Hamidou_Makalou.html", "Hamissou_Dangabo.html", "Hamza_Salhi.html", "Hannes_Hunziker.html", "Hans_Vanaken.html", "Hans_Vimma_Eskilsson.html", "Hany_Mukhtar.html", "Harry_Howell.html", "Harry_Kane.html", "Harvey_Elliott.html", "Hatenboer.html", "Hebert_Antonio_Silva.html", "Hebert_Luis_Pais.html", "Hector_Baley.html", "Hector_Camarão_Junior.html", "Hector_Chumpitaz.html", "Hector_Daniel_Miranda.html", "Hector_Eduardo_Maldonado.html", "Hector_Gabriel_Carrasco.html", "Hector_Mauricio_Pineda.html", "Hector_Nunez.html", "Hector_Omar_Silva.html", "Hector_Scarone.html", "Heinz_Morschel.html", "Helder_Suker.html", "Helias_Belliard.html", "Henri_Savini.html", "Henri_Stambouli.html", "Henrik_Bertilsson.html", "Henrik_Hanche_Hafskjold.html", "Henrik_Larsson.html", "Henrik_Nielsen.html", "Henrique_Manuel_Loiria_Azevedo.html", "Henry_Ariel_Lopez.html", "Herminio_Nadruga_Neves.html", "Hernan_Jorge_Crespo.html", "Hernán_Castellanos.html", "Hernán_Claudio_Castellano.html", "Hernán_Diaz.html", "Hernán_Edgardo_Diaz.html", "Hernán_Franco.html", "Hernán_Gonzalez.html", "Hernán_Jorge_Crespo.html", "Hernán_Lopez.html", "Hernán_Maisterra.html", "Hernán_Meske.html", "Hernán_Oviedo.html", "Hernán_Pedraza.html", "Hernán_Raciti.html", "Hernán_Rene_Solari.html", "Hernán_Sebastián_Cattaneo.html", "Hervé_Alicarte.html", "Hervé_Anziani.html", "Hervé_Arsène.html", "Hervé_Blanc.html", "Hervé_Broca.html", "Hervé_Flores.html", "Hicham_Mahou.html", "Hidemar_Moreira_Marques.html", "Himad_Abdelli.html", "Himran_Fofana.html", "Holger_Quiñonez.html", "Honest_Ahanor.html", "Honest_Anahor.html", "Horacio_Alberto_Attadia.html", "Horacio_Aldo_Humoller.html", "Horacio_Andrés_Ameli.html", "Horacio_Attadia.html", "Horacio_Carbonari.html", "Horacio_Cordero.html", "Horacio_D'Angelo.html", "Horacio_David_Osuna.html", "Horacio_Humoller.html", "Horacio_Javier_Bidevich.html", "Horacio_Monti.html", "Horacio_Ozuna.html", "Horacio_Peralta.html", "Horacio_René_Ruiz_Diaz.html", "Hristo_Stoichkov.html", "Hubert_Fournier.html", "Hugo_Avalos.html", "Hugo_Camberos.html", "Hugo_Corbalan.html", "Hugo_Daniel_Musladini.html", "Hugo_De_Leon.html", "Hugo_Eduardo_De_Leon.html", "Hugo_Ekitike.html", "Hugo_Ernesto_Gottardi.html", "Hugo_Galloni.html", "Hugo_Gatti.html", "Hugo_Gottardi.html", "Hugo_Guerra_Cabrera.html", "Hugo_Guillamon.html", "Hugo_Humberto_Lamadrid.html", "Hugo_Ibarra.html", "Hugo_Javier_Fernandez.html", "Hugo_José_Duarte.html", "Hugo_Lamadrid.html", "Hugo_Larsson.html", "Hugo_Leonardo_Perez.html", "Hugo_Maradona.html", "Hugo_Mario_Noremberg.html", "Hugo_Miguel_Parrado.html", "Hugo_Morales.html", "Hugo_Musladini.html", "Hugo_Norberto_Castillo.html", "Hugo_Omar_Baldenegro.html", "Hugo_Omar_Casajous.html", "Hugo_Romeo_Guerra.html", "Hugo_Sanchez.html", "Hugo_Villaverde.html", "Humberto_Biazotti.html", "Humberto_Daniel_Gutierrez.html", "Humberto_Garces.html", "Humberto_Gutierrez.html", "Hyppolite_Dangbeto.html", "Hyun_Ju_Lee.html", "Héctor_Adolfo_Enrique.html", "Héctor_Adrián_Baillie.html", "Héctor_Alberto_Chazarreta.html", "Héctor_Almandoz.html", "Héctor_Ariel_Silva.html", "Héctor_Arzubialde.html", "Héctor_Baley.html", "Héctor_Banegas.html", "Héctor_Blanco_Salcedo.html", "Héctor_Burguez.html", "Héctor_Carlos_Arzubialde.html", "Héctor_Cejas.html", "Héctor_Chazarreta.html", "Héctor_Cuper.html", "Héctor_Damián_Larroque.html", "Héctor_Eduardo_Martinez.html", "Héctor_Enrique.html", "Héctor_Giorgetti.html", "Héctor_Gonzalez.html", "Héctor_Guillermo_Cejas.html", "Héctor_Ignacio_Rodriguez.html", "Héctor_Iván_Varisco.html", "Héctor_Lopez.html", "Héctor_Marcelo_Perez.html", "Héctor_Miranda.html", "Héctor_Monroig.html", "Héctor_Orlando_Ledesma.html", "Héctor_Pineda.html", "Héctor_Rivoira.html", "Héctor_Rodriguez_Peña.html", "Héctor_Sanchez.html", "Héctor_Silva.html", "Héctor_Tobio.html", "Héctor_Valenzuela.html", "Héctor_Vargas.html", "Héctor_Vargas_2.html", "Héctor_Vittor.html", "Hélder_Joaquim_Máximo_Catalão.html", "Ian_Poortvliet.html", "Ian_Wright.html", "Ibrahim_Ba.html", "Ibrahim_Coulibaly.html", "Ibrahim_Mbaye.html", "Ibrahim_Sissoko.html", "Ibrahim_Toure.html", "Ibrahima_Bakayoko.html", "Ibrahima_Cherif_Fofana.html", "Ignacio_Gonzalez.html", "Ignacio_Perruzzi.html", "Ignacio_Russo.html", "Ignacio_Vercellone.html", "Ignasi_Miquel.html", "Igor_Dobrovolski.html", "Igor_Lichnovsky.html", "Igor_Thiago.html", "Iker_Fimbres.html", "Iker_Kortajarena.html", "Ilias_Sebaoui.html", "Ilyas_Ansah.html", "Ilyas_Benktib.html", "Ilyes_Mansouri.html", "Imre_Schlosser.html", "Inaki_Pena.html", "Inaki_Williams.html", "Irene_Paredes.html", "Iron_Gomis.html", "Isaac_Angking.html", "Isaac_Cossier.html", "Isaac_Emojong.html", "Isabelino_Gradin.html", "Isak_Hien.html", "Isaías_Marques_Soares.html", "Isco_Alarcon.html", "Ismael_Doukoure.html", "Ismael_Haddou.html", "Ismael_Saibari.html", "Ismail_Yuksek.html", "Isnaba_Ioncana_Bruma.html", "Israel_Rodríguez.html", "Italo_Ortiz.html", "Ivan_Augusto.html", "Ivan_Cordoba.html", "Ivan_César_Silva_Machado.html", "Ivan_De_La_Pena.html", "Ivan_De_La_Pena_Asensi.html", "Ivan_Ilić.html", "Ivan_Nestor_Rivero.html", "Ivan_Pillud.html", "Ivan_Toney.html", "Ivan_Zamorano.html", "Ivan_de_Paiva_Freire.html", "Ivar_Gerardo_Stafuza.html", "Ivar_Stafussa.html", "Ivo_Basay.html", "Ivo_Nabais.html", "Ivo_Ron.html", "Iván_César_Gabrich.html", "Iván_Lemmi.html", "J.-François_Domergue.html", "J.-Jacques_Novo.html", "J.-Louis_Zanon.html", "J.-Marc_Rodolphe.html", "J.-Pierre_Avrillon.html", "J.-Sylvestre_Aumac.html", "JJ_Gabriel.html", "Jaap_Stam.html", "Jabir_Abdihakim_Ali.html", "Jacek_Bąk.html", "Jacek_Ziober.html", "Jacinto_Cabrera.html", "Jackson_Dietrich.html", "Jacky_Bonnevay.html", "Jacky_Colin.html", "Jacky_Paillard.html", "Jacob_Ambaek.html", "Jacob_Bruunlarsen.html", "Jacob_Friis-Hansen.html", "Jacob_Ramsey.html", "Jacques_Philip.html", "Jacques_Songo'o.html", "Jaime_Alves_Magalhães.html", "Jaime_Arango.html", "Jaime_Fernandes_Magalhães.html", "Jaime_Garcete_Benitez.html", "Jaime_Jerónimo_das_Marsão.html", "Jaime_Moreira_Pacheco.html", "Jaime_Ramón_Garcete.html", "Jair_Cortes.html", "Jairzinho.html", "Jakob_Friis-Hansen.html", "Jakub_Kaluzinski.html", "Jalal_Abdulai.html", "Jalen_Foucan.html", "Jamal_Musiala.html", "James_Debbah.html", "James_Mc_Connell.html", "James_Rodriguez.html", "Jan_Johnsson_Sorenson.html", "Jan_Oblak.html", "Jan_Paolo_Debijadji.html", "Jann-Fiete_Arp.html", "Janpol_Morales.html", "Japhet_N'Doram.html", "Jared_Borgetti.html", "Jari_Litmanen.html", "Jarne_Steuckers.html", "Javi_Díaz.html", "Javier_Agustín_Vergel.html", "Javier_Arbarello.html", "Javier_Baena.html", "Javier_Dely_Valdes.html", "Javier_Gomez.html", "Javier_Goycoechea.html", "Javier_Gustavo_Mazzoni.html", "Javier_Lavallen.html", "Javier_Lopez_Baez.html", "Javier_Novarini.html", "Javier_Omar_Delgado.html", "Javier_Paez.html", "Javier_Rosada.html", "Javier_Sabino_Ferreira.html", "Javier_Sanguinetti.html", "Javier_Taborda.html", "Javier_Vicente_Wanchope.html", "Javier_Zanetti.html", "Jay_Gorter.html", "Jayden_Onia_Seke.html", "Jean-Antoine_Bell.html", "Jean-Christophe_Cano.html", "Jean-Christophe_Debu.html", "Jean-Christophe_Devaux.html", "Jean-Christophe_Malabry.html", "Jean-Christophe_Rouvière.html", "Jean-Christophe_Thomas.html", "Jean-Christophe_Thouvenel.html", "Jean-Claude_Darcheville.html", "Jean-Claude_Lemoult.html", "Jean-Claude_Milani.html", "Jean-Claude_Nadon.html", "Jean-Claude_Pagal.html", "Jean-François_Charbonnier.html", "Jean-François_Daniel.html", "Jean-François_Hernandez.html", "Jean-François_Larios.html", "Jean-François_Soucasse.html", "Jean-Guy_Wallemme.html", "Jean-Jacques_Etame.html", "Jean-Jacques_Eydelie.html", "Jean-Jacques_Houzé.html", "Jean-Jacques_Nono.html", "Jean-Jacques_Périon.html", "Jean-Louis_Berenguier.html", "Jean-Louis_Garcia.html", "Jean-Louis_Lima.html", "Jean-Luc_Buisine.html", "Jean-Luc_Courtet.html", "Jean-Luc_Dogon.html", "Jean-Luc_Ettori.html", "Jean-Luc_Le_Maguéresse.html", "Jean-Luc_Lemonnier.html", "Jean-Luc_Oltra.html", "Jean-Luc_Ribar.html", "Jean-Luc_Ruty.html", "Jean-Luc_Sassus.html", "Jean-Luc_Vannuchi.html", "Jean-Luc_Vasseur.html", "Jean-Manuel_Thetis.html", "Jean-Marc_Adjovi-Bocco.html", "Jean-Marc_Chanelet.html", "Jean-Marc_Ferratge.html", "Jean-Marc_Ferreri.html", "Jean-Marc_Frotey.html", "Jean-Marc_Furlan.html", "Jean-Marc_Knapp.html", "Jean-Marc_Miton.html", "Jean-Marc_Moulin.html", "Jean-Marc_Pilorget.html", "Jean-Marc_Valadier.html", "Jean-Marie_Aubry.html", "Jean-Michel_Capoue.html", "Jean-Michel_Ferri.html", "Jean-Michel_Guede.html", "Jean-Pascal_Beaufreton.html", "Jean-Philippe_Delpech.html", "Jean-Philippe_Durand.html", "Jean-Philippe_Foret.html", "Jean-Philippe_Javary.html", "Jean-Philippe_Mattio.html", "Jean-Philippe_Primard.html", "Jean-Philippe_Rohr.html", "Jean-Philippe_Séchet.html", "Jean-Pierre_Bade.html", "Jean-Pierre_Bosser.html", "Jean-Pierre_Cyprien.html", "Jean-Pierre_Delaunay.html", "Jean-Pierre_Lama.html", "Jean-Pierre_Lauricella.html", "Jean-Pierre_Orts.html", "Jean-Pierre_Papin.html", "Jean-Roch_Testa.html", "Jean-Sylvain_Auniac.html", "Jean-Yves_Hours.html", "Jean-Yves_de_Blasiis.html", "Jean_Acedo.html", "Jean_Castaneda.html", "Jean_Marc_Bosman.html", "Jean_Philippe_Mateta.html", "Jean_Ricner_Bellegarde.html", "Jean_Tigana.html", "Jeff_Strasser.html", "Jefferson_Farfan.html", "Jefferson_Lerma.html", "Jefferson_Savarino.html", "Jeisson_Lucumi.html", "Jephthe_Malanda.html", "Jeppe_Cassim.html", "Jeppe_Erenbjerg.html", "Jerdy_Schouten.html", "Jeremy_Doku.html", "Jeremy_Gelin.html", "Jeremy_Livolant.html", "Jerome_Opoku.html", "Jesper_Olsen.html", "Jesper_Reitan_Sunde.html", "Jesus_Rodríguez.html", "Jesús_Aguiar.html", "Jhan_Rengifo.html", "Jhon_Arias.html", "Jhon_Cordoba.html", "Jhon_Emerson_Cordoba.html", "Jhon_Trellez.html", "Jim_Montgomery.html", "Jimmy_Floyd_Hasselbaink.html", "Jimmy_Greaves.html", "Jimmy_Kenyi.html", "Jin_Young_Yuk.html", "Jizz_Hornkamp.html", "Joachim_Fernandez.html", "Joao_Aragao.html", "Joao_Carvalho.html", "Joao_Gastao.html", "Joao_Oliveira.html", "Joao_Silva.html", "Joaquim_Alberto_Castanheira_do_Nélo.html", "Joaquim_Alexandre_L._Santos.html", "Joaquim_Angelo_D._Ferreira.html", "Joaquim_Assunção_Costa.html", "Joaquim_Carvalho_Azevedo.html", "Joaquim_Fernando_Ferreira_Isaac.html", "Joaquim_Gonçalves_Remélio.html", "Joaquim_I._Ferreirinha_Moreira.html", "Joaquim_M._Pinto_e_Rocha.html", "Joaquim_Manuel_Aguiar_Serafim.html", "Joaquim_Miguel_Pedrosinho_Pedrosinha.html", "Joaquin_Boghossian.html", "Joaquin_Boghossian_Coach.html", "Joaquin_Irigoytia.html", "Joaquin_Seys.html", "Joaquín_Irigoytia.html", "Joaquín_Irigoytia_River_Plate.html", "Jocelyn_Angloma.html", "Jocelyn_Blanchard.html", "Jocelyn_Fontanel.html", "Jocelyn_Gourvennec.html", "Jocelyn_Monate.html", "Jocelyn_Rico.html", "Joe_Nagbe.html", "Joe_Rodon.html", "Joel_Drommel.html", "Joel_Ordonez.html", "Joel_Ordoñez.html", "Joey_Veerman.html", "Johan_Bakayoko.html", "Johan_Cruyff.html", "Johan_Micoud.html", "Johan_Mojica.html", "Johan_Neeskens.html", "Johan_Rotsen.html", "John_Acurio.html", "John_Boi_Ashiro.html", "John_Bosman.html", "John_Edison_Castaño.html", "John_Kolawole.html", "John_Lammers.html", "John_Sivebaek.html", "Johnny_Ekstroem.html", "Johnny_Rodriguez.html", "Jojo_Montanella.html", "Jon_Bautista.html", "Jonatas_Noro.html", "Jonathan_David.html", "Jonathan_Mexique.html", "Jonathan_Tah.html", "Jones_El_Abdellaoui.html", "Jordan_Barrera.html", "Jordan_Bos.html", "Jordy_Bos.html", "Jorge_A_Bianchi.html", "Jorge_Acuña.html", "Jorge_Alberto_Gonzalez.html", "Jorge_Alberto_Jansa.html", "Jorge_Alberto_Merlo.html", "Jorge_Alberto_Ortega.html", "Jorge_Almiron.html", "Jorge_Alvez_Fernandez.html", "Jorge_Andrade_de_Guimarães.html", "Jorge_Antonio_Battaglia.html", "Jorge_Antonio_Caballero.html", "Jorge_Antonio_Vivaldo.html", "Jorge_Avalos.html", "Jorge_Balbis.html", "Jorge_Bardek.html", "Jorge_Bartero.html", "Jorge_Battaglia.html", "Jorge_Borelli.html", "Jorge_Borelli_San_Lorenzo.html", "Jorge_Brandoni.html", "Jorge_Burruchaga.html", "Jorge_Carrascal.html", "Jorge_Cartaman.html", "Jorge_Ciancaglini.html", "Jorge_Clara.html", "Jorge_Claudio_Arbiza.html", "Jorge_Comas.html", "Jorge_Cordon.html", "Jorge_Daniel_Buldain.html", "Jorge_Daniel_Cardaccio.html", "Jorge_Daniel_Fossati.html", "Jorge_Daniel_Villagarcia.html", "Jorge_Eduardo_Barca.html", "Jorge_Enrique_Cruz.html", "Jorge_Fabio_Fili.html", "Jorge_Fabián_Reina.html", "Jorge_Federico_Reinoso.html", "Jorge_Fernandez.html", "Jorge_Fernando_Sere.html", "Jorge_Ferrer.html", "Jorge_Ferrero.html", "Jorge_Fossati.html", "Jorge_Gabriel_Alvez.html", "Jorge_Gabriel_Vazquez.html", "Jorge_Garcia.html", "Jorge_Gaspari.html", "Jorge_Gomes_da_Silva_Filho.html", "Jorge_Gonzalez_Barillas.html", "Jorge_Gordillo.html", "Jorge_Guillermo_Almada.html", "Jorge_Higuain.html", "Jorge_Horacio_Borelli.html", "Jorge_Humberto_de_Freitas_Rodrigues.html", "Jorge_Jansa.html", "Jorge_Jimenez.html", "Jorge_Leonardo_Garay.html", "Jorge_Luis_Ramoa.html", "Jorge_Luís_Madureira_da_Silva_Freitas.html", "Jorge_Manuel_Caetano_do_Rosário.html", "Jorge_Manuel_Correia_Oliveira_Silva.html", "Jorge_Manuel_Domingos_Maria_Vital.html", "Jorge_Manuel_Duarte_Portela.html", "Jorge_Manuel_Gomes_Severino.html", "Jorge_Manuel_Gordillo.html", "Jorge_Manuel_Lopes_da_Silva.html", "Jorge_Manuel_Marques_Meta.html", "Jorge_Manuel_Teixeira_Moçanos.html", "Jorge_Marcelo_Hiriart.html", "Jorge_Marcelo_Marquez.html", "Jorge_Marcelo_Matheu.html", "Jorge_Marcelo_Mauri.html", "Jorge_Martin.html", "Jorge_Martinez.html", "Jorge_Martín_Piñon.html", "Jorge_Mozo.html", "Jorge_Nefle.html", "Jorge_Nicolás_Higuain.html", "Jorge_Nicolás_Higuain_2.html", "Jorge_Olguin.html", "Jorge_Omar_Andujar.html", "Jorge_Ortega.html", "Jorge_Osmar_Acuna.html", "Jorge_Osvaldo_Bartero.html", "Jorge_Otero.html", "Jorge_Pajurek.html", "Jorge_Paulo_Cabete_dos_Santos_Reis.html", "Jorge_Pautasso.html", "Jorge_Pellegrini.html", "Jorge_Placido.html", "Jorge_Porley.html", "Jorge_Priotti.html", "Jorge_Ramón_Muñoz.html", "Jorge_Raúl_Zapata.html", "Jorge_Reinoso.html", "Jorge_Remigio_Pautasso.html", "Jorge_Rinaldi.html", "Jorge_Roberto_Quinteros.html", "Jorge_San_Esteban.html", "Jorge_Sousa_Gomes.html", "Jorge_Theiler.html", "Jorge_Toscano.html", "Jorge_Valdano.html", "Jorge_Valdivia.html", "Jorge_Villazan.html", "Jorge_Villazan_2.html", "Jorge_Viñas.html", "Jorge_Walter_Barrios.html", "Jorge_Walter_Contreras.html", "Jorge_Walter_Theiler.html", "Jorge_da_Costa_Ferreira.html", "Jorge_da_Costa_Silva.html", "Joris_Chotard.html", "Jorman_Campuzano.html", "Jorrel_Hato.html", "Jorrão_Gonvela_de_Barros.html", "Jorthy_Mokio.html", "Jos_Van_Herpen.html", "Jose_Alfredo_Forte.html", "Jose_Angel_Carmona.html", "Jose_Caldera.html", "Jose_Carlos_Batista.html", "Jose_Cortes.html", "Jose_Escorcia.html", "Jose_Fontan.html", "Jose_Manuel_Moreno.html", "Jose_Maria_Vieta.html", "Jose_Miguel.html", "Jose_Nasazzi.html", "Jose_Oscar_Flores.html", "Jose_Ramirez.html", "Jose_Sampaio.html", "Jose_Sosa.html", "Josef_Bican.html", "Josef_Masopust.html", "Josef_Tyburczyk.html", "Josemildo_Patrício_dos_Santos.html", "Josemir_Lujambio_Llanes.html", "Joseph-Antoine_Bell.html", "Joshua_Vangoman.html", "Joshua_Zirkzee.html", "Josip_Posavec.html", "Joszef_Bozsik.html", "José_A._Gonçalves_Portela.html", "José_A_Larrazabal.html", "José_Adrián_Borges.html", "José_Adrián_Gallego.html", "José_Alberto_Batista.html", "José_Alberto_Peixoto_da_Silva.html", "José_Alberto_Percudani.html", "José_Alberto_T._Fernandinho.html", "José_Albornoz.html", "José_Alexandre_Évora_Alhinho.html", "José_Alul.html", "José_Amaro_Justino.html", "José_Antonio_Castro.html", "José_Antonio_Chamot.html", "José_Antonio_Chileli.html", "José_Antonio_Giacone.html", "José_António_Ferreira_Lopes.html", "José_António_Lima_da_Cruz.html", "José_António_Lopes_Jorge.html", "José_António_Prudência_Conde_Bargiela.html", "José_António_Ramalho_Lima.html", "José_António_Silvestre_Rafael.html", "José_António_da_Rocha_Garrido.html", "José_António_dos_Santos_Costa.html", "José_Armando_Mendes_Ribeiro.html", "José_Augusto_Ferreira_de_Jesus.html", "José_Augusto_Pereira_Leite.html", "José_Barella.html", "José_Barrella.html", "José_Barreto_Pereira.html", "José_Basualdo.html", "José_Batista.html", "José_Batista_Gonzalez.html", "José_Bianco.html", "José_Bray.html", "José_Burtovoy.html", "José_Calderon.html", "José_Campi.html", "José_Carlos_Alves_Vieira.html", "José_Carlos_Martins_Vinagre_Soares.html", "José_Carlos_Melo_e_Pinto.html", "José_Carlos_Nepomuceno_Muzor.html", "José_Carlos_Santiago_da_Silva.html", "José_Carvalho_Gonçalves.html", "José_Castro.html", "José_Chatruc.html", "José_Chilavert.html", "José_Chilavert_Gonzalez.html", "José_Cobos.html", "José_Cuciuffo.html", "José_Daniel_Di_Leo.html", "José_Daniel_Ponce.html", "José_Di_Leo.html", "José_Ducca.html", "José_Enrique_Garcia.html", "José_Enrique_Gonzalez.html", "José_F._Semedo_Fidalgo.html", "José_Fantaguzzi.html", "José_Fernando_Silva_Nafos.html", "José_Fernando_Silva_Pinto.html", "José_Francisco_G._Fasta.html", "José_Gaitan.html", "José_Gonçalves_Rocha.html", "José_Guillermo_Lopez.html", "José_Horacio_Basualdo.html", "José_Hugo_Montelongo.html", "José_Irazoqui.html", "José_Joaquim_Pimentel_Ribeiro.html", "José_João_da_Silva_Menes.html", "José_Luis_Albarenque.html", "José_Luis_Brown.html", "José_Luis_Correa.html", "José_Luis_Cuciuffo.html", "José_Luis_Ducca.html", "José_Luis_Pintos_Saldaña.html", "José_Luis_Pochettino.html", "José_Luis_Sánchez.html", "José_Luis_Villarreal.html", "José_Lupi_Lopes_Aguas.html", "José_Luís_Lopes_Costa_Silva.html", "José_Luís_Pinto_de_Sousa.html", "José_Manuel_Fernandes_Silva_Sykes_Bizarro.html", "José_Manuel_Fernandez.html", "José_Manuel_Fária_Monteiro.html", "José_Manuel_Jesus_Tavares_Santos.html", "José_Manuel_Martins_da_Silva.html", "José_Manuel_Nota_Delgado.html", "José_Manuel_Silva_Ribeiro.html", "José_Manuel_Torres.html", "José_Manuel_Vidal_Ribeiro.html", "José_Manuel_Vinagre_Soares.html", "José_Martins_Leal.html", "José_Marzo.html", "José_María_Bianco.html", "José_María_Paz.html", "José_María_Zambrini.html", "José_Mauricio_Larriera.html", "José_Miguel.html", "José_Minda.html", "José_Moreiras.html", "José_Moron.html", "José_Nicolau_Rodrigues_Pereira.html", "José_Nilson_Costa_de_Jesus.html", "José_Nuno_Freire_da_Silva_Azevedo.html", "José_Omar_Zabala.html", "José_Orlando_Blanchart.html", "José_Orlando_Rocha_Rocha_Senedo.html", "José_Oscar_Flores.html", "José_Pastinelli.html", "José_Pavoni.html", "José_Pedro_Almeida_Pereira.html", "José_Pedro_Escobar.html", "José_Pedro_Fernandes_Nota.html", "José_Percudani.html", "José_Pochettino.html", "José_Ponce.html", "José_Raimundo_D._Gomes.html", "José_Ramirez.html", "José_Raúl_Iglesias.html", "José_Rendon.html", "José_Rodriguez.html", "José_S_Puente.html", "José_Salas_Melinao.html", "José_Sayago.html", "José_Sebastião_Pires_Neto.html", "José_Sequeira.html", "José_Serrizuela.html", "José_Sosa_Acuña.html", "José_Sotelo.html", "José_Sérgio_Pires_Louro.html", "José_Tiburcio_Serrizuela.html", "José_Touré.html", "José_Tursi.html", "José_Vieta.html", "José_Walter_Pascoal_Ondres.html", "José_Xavier_Pereira_Roque.html", "José_da_Silva_Coelho.html", "Joyeux_Masanka_Bungi.html", "Jozy_Altidore.html", "João_Amadeu_Tavares_Correia.html", "João_Amândio_de_Oliveira.html", "João_António_M._Cunha_Redondo.html", "João_António_Silva_Duarte_Gajo.html", "João_António_da_Silva_Gomes.html", "João_Arnaldo_Correia_de_Carvalho.html", "João_Augusto_Mendonça_Cabral.html", "João_Carlos_Brandão_Gonçalves.html", "João_Carlos_Lopes.html", "João_Domingos_da_Silva_Pinto.html", "João_Luís_Barbosa.html", "João_Luís_Garcês_Esteves.html", "João_Luís_Gouveia_Martins.html", "João_Manuel_Loureiro_dos_Santos.html", "João_Manuel_Morgado_de_Oliveira.html", "João_Marques_Jesus_Lopes.html", "João_Mário_Ferreira_Oliveira.html", "João_Mário_de_S._Gonçalves.html", "João_Nuno_Dias_Conde_Martins.html", "João_Paulo_Freitas_Sousa.html", "João_Paulo_Morgado_de_Barros_Tomás.html", "João_Paulo_Valério_Nobre.html", "João_Paulo_Vicente_C._Ferreira.html", "João_Paulo_da_Silva_Vieira.html", "João_Rafael_dos_Santos.html", "João_Ribeiro_Gonveia.html", "João_Ribeiro_Silva.html", "João_Sérgio_Almeida_Santos.html", "João_de_Deus_Santos_Cézar.html", "Joël_Bats.html", "Joël_Cloarec.html", "Joël_Germain.html", "Joël_Henry.html", "Joël_Tiéhi.html", "Juan_A_Acosta.html", "Juan_Alfonsin.html", "Juan_Amador_Sanchez.html", "Juan_Amador_Sanchez_2.html", "Juan_Andrés_Gómez.html", "Juan_Antonio_Alarcon.html", "Juan_Antonio_Pizzi.html", "Juan_Aparicio_Sandoval.html", "Juan_Arango.html", "Juan_Arce.html", "Juan_Azconzabal.html", "Juan_Barrionuevo.html", "Juan_Bautista_Chumba.html", "Juan_Bogado.html", "Juan_Brown.html", "Juan_Bujedo.html", "Juan_C_Correa.html", "Juan_Cabrera.html", "Juan_Cardinal.html", "Juan_Carlos_Albarello.html", "Juan_Carlos_Areco.html", "Juan_Carlos_Arguello.html", "Juan_Carlos_De_Lima.html", "Juan_Carlos_Docabo.html", "Juan_Carlos_Farias.html", "Juan_Carlos_Higuita.html", "Juan_Carlos_Kopriva.html", "Juan_Carlos_Obregon.html", "Juan_Carlos_Paz.html", "Juan_Carlos_Saucedo.html", "Juan_Carlos_Segovia.html", "Juan_Carlos_Suarez.html", "Juan_Carlos_Veron.html", "Juan_Colombo.html", "Juan_Crespin.html", "Juan_Cámara.html", "Juan_Erba.html", "Juan_Ernesto_Simon.html", "Juan_Eudoro_Medina.html", "Juan_Fernandez_Di_Alessio.html", "Juan_Fernando_Gonez.html", "Juan_Fleita.html", "Juan_Francisco_Ferreri.html", "Juan_Francisco_Wabeke.html", "Juan_Funes.html", "Juan_Gilberto_Funes.html", "Juan_Herrero.html", "Juan_Ignacio_Fernández.html", "Juan_J_Lombardi.html", "Juan_Jacinto_Rodriguez.html", "Juan_Jose_Romero.html", "Juan_José_Basilico.html", "Juan_José_Bogado.html", "Juan_José_Borrelli.html", "Juan_José_Meza.html", "Juan_José_Rossi.html", "Juan_José_Sanchez.html", "Juan_Kopriva.html", "Juan_Langenheim.html", "Juan_Lezica.html", "Juan_Llop.html", "Juan_M_Amondarain.html", "Juan_Maciel.html", "Juan_Manuel_Asensi.html", "Juan_Manuel_Llop.html", "Juan_Marcelo_Alegre.html", "Juan_Marcelo_Ceferino_Fontana.html", "Juan_Mario_Obulgen.html", "Juan_Martín_Galiano.html", "Juan_Meza.html", "Juan_Oficialdegui.html", "Juan_P_Rabino.html", "Juan_Pablo_Sorin.html", "Juan_R_Carrasco.html", "Juan_R_Moran.html", "Juan_Ramirez.html", "Juan_Ramón_Jara.html", "Juan_Ramón_Verón.html", "Juan_Raúl_Arce.html", "Juan_Real.html", "Juan_Rengifo.html", "Juan_Riquelme_Angulo.html", "Juan_Rojas.html", "Juan_Roman_Riquelme.html", "Juan_Rossi.html", "Juan_Schiaffino.html", "Juan_Sebastian_Veron.html", "Juan_Sebastián_Verón.html", "Juan_Segovia.html", "Juan_Sen.html", "Juan_Serrizuela.html", "Juan_Simon.html", "Juan_Sorin.html", "Juan_Suligoy.html", "Juan_Turchi.html", "Juan_Urruti.html", "Juan_Vojvoda.html", "Juan_Zubczuk.html", "Juan_de_Dios_Quiroga.html", "Juanlu_Sanchez.html", "Juary_Jorge_dos_Santos_Filho.html", "Jude_Bellingham.html", "Jules_Bocandé.html", "Julian_De_La_Cuesta.html", "Julian_Eyestone.html", "Julian_Kania.html", "Julian_Rijkhoff.html", "Julian_Veldman.html", "Julien_Vetro.html", "Julinho.html", "Julio_A_Olveira.html", "Julio_Acuña.html", "Julio_Alberto_Zamora.html", "Julio_Albino.html", "Julio_Balerio.html", "Julio_C_Fuentes.html", "Julio_C_Ribas.html", "Julio_Cappella.html", "Julio_Cesar_Romero.html", "Julio_Crespo.html", "Julio_Cruz.html", "Julio_César_Baldivieso.html", "Julio_César_Balerio.html", "Julio_César_Barrios.html", "Julio_César_Dely_Valdes.html", "Julio_César_Gaona.html", "Julio_César_Lancieri.html", "Julio_César_Rodriguez.html", "Julio_César_Santillan.html", "Julio_César_Sopeña.html", "Julio_César_Toresani.html", "Julio_Dely_Valdés.html", "Julio_Eduardo_De_Souza.html", "Julio_Eduardo_Rubio.html", "Julio_Falcioni.html", "Julio_Fizzani.html", "Julio_Gaona.html", "Julio_Gento.html", "Julio_Gimenez.html", "Julio_Gonzalez.html", "Julio_Hector_Ceballos.html", "Julio_Jorge_Olarticoechea.html", "Julio_Llorente.html", "Julio_Marinilli.html", "Julio_Melendez.html", "Julio_Muñoz.html", "Julio_Olarticoechea.html", "Julio_Omar_Pedernera.html", "Julio_Pavon.html", "Julio_Rossi.html", "Julio_Saldaña.html", "Julio_Toresani.html", "Julio_Werro.html", "Julián_Camino.html", "Julián_Esteban_Infantino.html", "Julián_Infantino.html", "Julliani_Eersteling.html", "Junior_Brumado.html", "Junior_Etou.html", "Just_Fontaine.html", "Justin_Kluivert.html", "Justin_Rasmussen.html", "Juvenal_Ferreira_da_Costa.html", "Juvenal_Olmos.html", "Jérémy_Denquin.html", "Jérôme_Bonnissel.html", "Jérôme_Foulon.html", "Jérôme_Geffroy.html", "Jérôme_Gnako.html", "Jérôme_Molinier.html", "Jérôme_Sykora.html", "Júlio_Vaz_de_Amarante.html", "Ka_Semedo.html", "Kaba_Diawara.html", "Kader_Ferhaoui.html", "Kai_Havertz.html", "Kaka.html", "Kalman_Kovacs.html", "Kalombo_N'Kongolo.html", "Kaloyan_Bozhkov.html", "Kalusha_Bwalya.html", "Kamiel_Van_De_Perre.html", "Karim_Benzema.html", "Karim_Loukili.html", "KarlHeinz_Rumenigge.html", "Karl_Etta_Eyong.html", "Karl_Etta_Eyong_Player_Card.html", "Karl_Gameni_Wassom.html", "Karl_Heinz_Förster.html", "Kasper_Dolberg.html", "Kaua_Prates.html", "Kazadi_Muamba.html", "Kees_Smit.html", "Kei_Kamara.html", "Keisuke_Goto.html", "Kemar_Lawrence.html", "Kenan_Avdusinovic.html", "Kenan_Yıldız.html", "Kendry_Paez.html", "Kenneth_Eichhorn.html", "Kenneth_Taylor.html", "Kenny_Dalglish.html", "Kenny_Liema_Olinga.html", "Kephren_Thuram.html", "Kerim_Alajbegovic.html", "Kevin_Amaro.html", "Kevin_Denkey.html", "Kevin_Keegan.html", "Kevin_Mac_Allister.html", "Kevin_Mbabu.html", "Kevin_Schade.html", "Keyliane_Abdallah.html", "Keylor_Navas.html", "Keyungama_Madinula.html", "Khalid_Abi.html", "Khouma_Babacar.html", "Kialy_Kone.html", "Kilian_Lokembo_Lokaso.html", "Kiliann_Sildillia_Empire_FGA_Card.html", "Kimball_Jackson.html", "Klaus_Allofs.html", "Klaus_Fischer.html", "Kleber_Fajardo.html", "Ko_Itakura.html", "Kodai_Sano.html", "Kodjo_Afanou.html", "Kolo_Toure.html", "Konrad_de_la_Fuente.html", "Konstantinos_Karetsas.html", "Konstantinos_Koulierakis.html", "Koray_Ozcan.html", "Kristian_Arnstad.html", "Kristjan_Asllani.html", "Kristoffer_Velde.html", "Krys_Foleu_Tene.html", "Kuki_Salazar.html", "Kwami_Hodouto.html", "Kyanno_Silva.html", "Kylian_Mbappe.html", "Kévin_Monzialo.html", "Ladislao_Kubala.html", "Lakhdar_Belloumi.html", "Lakoi_N'Combasi.html", "Lalrinzuala_Lalbiaknia.html", "Lamine_Camara.html", "Lamine_Sagna.html", "Lamine_Yamal.html", "Lanej_Baksic.html", "Laones_Galli.html", "Lassana_Faye.html", "Laurent_Abergel.html", "Laurent_Blanc.html", "Laurent_Casanova.html", "Laurent_Castro.html", "Laurent_Charvet.html", "Laurent_Ciechelski.html", "Laurent_Croci.html", "Laurent_David.html", "Laurent_Debrosse.html", "Laurent_Delamontagne.html", "Laurent_Fournier.html", "Laurent_Grimaud.html", "Laurent_Guyot.html", "Laurent_Hervé.html", "Laurent_Huard.html", "Laurent_Lassagne.html", "Laurent_Moracchini.html", "Laurent_Peyrelade.html", "Laurent_Rigaux.html", "Laurent_Robert.html", "Laurent_Tomczyk.html", "Laurent_Viaud.html", "Lautaro_Martinez.html", "Lautaro_Rivero.html", "Lautaro_Trullet.html", "Lawrence_Thomas.html", "Leandro_Aureli.html", "Leandro_Cufre.html", "Leandro_Gonzalez_Pirez.html", "Leandro_Paredes.html", "Leandro_Perez.html", "Leandro_Temporini.html", "Leandro_Testa.html", "Lena_Oberdorf.html", "Lennart_Karl.html", "Leny_Tela.html", "Leny_Yoro.html", "Leo_Botz.html", "Leo_Duarte.html", "Leo_Pereira.html", "Leon_Goretzka.html", "Leon_Jakirovic.html", "Leonardo_Adrian_Ricatti.html", "Leonardo_Adrián_Rodriguez.html", "Leonardo_Alfredo_Ramos.html", "Leonardo_Angel_Luppino.html", "Leonardo_Ariel_Gomez.html", "Leonardo_Astrada.html", "Leonardo_Ayala.html", "Leonardo_Balerdi.html", "Leonardo_Buta.html", "Leonardo_Carol_Madelon.html", "Leonardo_Castiñeiras.html", "Leonardo_Daniel_Asencio.html", "Leonardo_Daniel_Selenzo.html", "Leonardo_Delfino.html", "Leonardo_Diaz.html", "Leonardo_E_Fernandez.html", "Leonardo_Fabian_Alegre.html", "Leonardo_Fabian_Itabel.html", "Leonardo_Favio_Martins.html", "Leonardo_Fernandez.html", "Leonardo_Franco.html", "Leonardo_Garcia.html", "Leonardo_Giraudo.html", "Leonardo_Itabel.html", "Leonardo_Jorge_Romay.html", "Leonardo_Madelon.html", "Leonardo_Oscar_Mas.html", "Leonardo_Ramos_Giro.html", "Leonardo_Ruben_Astrada.html", "Leonardo_Sciacqua.html", "Leonardo_Squadrone.html", "Leonardo_Tessa.html", "Leonel_Alvarez.html", "Leonel_Gancedo.html", "Leonel_Martens.html", "Leonel_Sanchez.html", "Leonidas.html", "Leonidas_Da_Silva.html", "Leopoldo_Luque.html", "Lev_Yashin.html", "Liazid_Sandjak.html", "Lilian_Compan.html", "Lilian_Laslandes.html", "Lilian_Thuram.html", "Lina_Magull.html", "Linus_Kurtz.html", "Lionel_Charbonnier.html", "Lionel_Letizi.html", "Lionel_Messi.html", "Lionel_Potillon.html", "Lionel_Prat.html", "Lionel_Rouxel.html", "Lionel_Sebastián_Scaloni.html", "Loic_Bade.html", "Lois_Diony.html", "Lomano_LuaLua.html", "Lorenzo_Frutos.html", "Lorenzo_Lucca.html", "Lorenzo_Minotti.html", "Lorenzo_Ojeda.html", "Lorenzo_Oscar_Saez.html", "Lorenzo_Ovidio_Ojeda.html", "Lorenzo_Venturino.html", "Lothar_Matthaus.html", "Louis_Gomis.html", "Louis_Marasi.html", "Louis_Pifrone.html", "Loïc_Amisse.html", "Loïc_Lambert.html", "Loïc_Perard.html", "Lubomir_Radanovic.html", "Luc_Borelli.html", "Luc_Borreli.html", "Luc_Sonor.html", "Luca_Toni.html", "Luca_Williams_Barnett.html", "Lucas_Alario.html", "Lucas_Bergvall.html", "Lucas_Canizares.html", "Lucas_Cassius_Gatti.html", "Lucas_Hey.html", "Lucas_Petkov.html", "Lucca_Dourado.html", "Luciano_Bergonzi.html", "Luciano_Galletti.html", "Luciano_Germán_Zavagno.html", "Luciano_Gondou.html", "Luciano_Nicotra.html", "Luciano_Oliveri.html", "Luciano_Spalletti_Coach.html", "Luciano_Spalletti_Player.html", "Luciano_Troulliet.html", "Luciano_Zavagno.html", "Lucien_Gulab_Boindon.html", "Lucio_Del_Mull.html", "Lucio_Roman_Del_Mul.html", "Lucy_Bronze.html", "Ludo_Debru.html", "Ludovic_Gallo.html", "Ludovic_Giuly.html", "Ludovic_Mary.html", "Ludovic_Pollet.html", "Ludovic_Stefano.html", "Ludovico_Varali.html", "Luigi_Alfano.html", "Luigi_Riva.html", "Luis_A_Berger.html", "Luis_Abdeneve.html", "Luis_Abramovich.html", "Luis_Alberto_Baratucci.html", "Luis_Alberto_Correa.html", "Luis_Alberto_Islas.html", "Luis_Alberto_Marquez.html", "Luis_Alberto_Monzón.html", "Luis_Alberto_Moreno.html", "Luis_Alberto_Noe.html", "Luis_Alberto_Orquera.html", "Luis_Alberto_Piazzalonga.html", "Luis_Alberto_Ramos.html", "Luis_Alberto_Villarreal.html", "Luis_Alejandro_Escobedo.html", "Luis_Americo_Scatolaro.html", "Luis_Angel_Ceballos.html", "Luis_Antonio_Amuchastegui.html", "Luis_Armando_Torres.html", "Luis_Artime.html", "Luis_Barbat_Hudema.html", "Luis_Bastos.html", "Luis_Calvo.html", "Luis_Capurro_Bautista.html", "Luis_Carlos_Perea.html", "Luis_Carranza.html", "Luis_Castillo.html", "Luis_Ceferino_Suarez.html", "Luis_Correa.html", "Luis_Cubilla.html", "Luis_Darío_Calvo.html", "Luis_Diaz.html", "Luis_Diego_Lopez.html", "Luis_Eduardo_Chabat.html", "Luis_Eduardo_Correa.html", "Luis_Eduardo_Da_Luz.html", "Luis_Enrique_Malvarez.html", "Luis_Ernesto_Abramovich.html", "Luis_Ernesto_Sosa.html", "Luis_Esteves.html", "Luis_Fabián_Artime.html", "Luis_Fernandez.html", "Luis_Fernando_Herrera.html", "Luis_Figo.html", "Luis_Francisco_Tonelotto.html", "Luis_G_Delor.html", "Luis_Gabriel_Suazo.html", "Luis_Ignacio_Tome.html", "Luis_Islas.html", "Luis_Javier_Fernandez.html", "Luis_Javier_Suarez.html", "Luis_Lobo.html", "Luis_Lucardi.html", "Luis_Luquez.html", "Luis_Malvarez.html", "Luis_María_Romero.html", "Luis_Medero.html", "Luis_Milla_Jr.html", "Luis_Milla_Sr.html", "Luis_Monti.html", "Luis_Ordoñez.html", "Luis_Oscar_Mammana.html", "Luis_Pereira.html", "Luis_Perez.html", "Luis_Piazzalonga.html", "Luis_Ramón_Abdeneve.html", "Luis_Sanchez.html", "Luis_Sosa.html", "Luis_Sosa_Tieri.html", "Luis_Suarez_Miramontes.html", "Luis_Suárez.html", "Luiz_António_Mendes_Cunha.html", "Luiz_Fernando.html", "Luka_Modric.html", "Luka_Socic.html", "Luka_Vuskovic.html", "Lukas_Klostermann.html", "Lukas_Roeser.html", "Luke_Biasi.html", "Luís_António_Mourão_Simões.html", "Luís_Bonfim_Marcos.html", "Luís_Carlos_Figueira.html", "Luís_Carlos_Sandi.html", "Luís_Carlos_Sousa_Ribeiro.html", "Luís_Fernando_P._Gonçalves_Sobrinho.html", "Luís_Filipe_Vieira_Carvalho.html", "Luís_Filipe_dos_Santos_Ferrinho.html", "Luís_Graciete_da_Costa_Sabra.html", "Luís_Lourenço_G._Elgueta.html", "Luís_Lourenço_Oliveira_Camacho.html", "Luís_Manuel_Correia_Silva_Costa.html", "Luís_Manuel_David_Sérgio.html", "Luís_Manuel_Pomba_Pereira.html", "Luís_Miguel_Brito_Ferreira.html", "Luís_Miguel_D._Fabião_da_Silva_Maia.html", "Luís_Miguel_Marques_Parada.html", "Luís_Nogueira_Fujisão.html", "Luís_Pedro_Soares_Barat_Mendes.html", "Luís_Ranúlo_Miranda_Ambro.html", "Luís_Wilson_Alemão.html", "Lyambo_Etshele.html", "Lyndon_Tomlinson_Dashboard.html", "Léo_Van_der_Elst.html", "Léonard_Specht.html", "Líber_Ernesto_Vespa.html", "Maarten_Vandevoordt.html", "Mac.html", "Macky_Bagnack.html", "Mads_Bech_Sorensen.html", "Magalhaes_Isaias.html", "Magnus_Mattsson.html", "Maher_Carrizo.html", "Maidana.html", "Maiky_De_La_Cruz.html", "Malabary_Arsène.html", "Malek_Adrar.html", "Malick_Thiaw.html", "Malte_Pahlsson.html", "Mamadou_Diakhon.html", "Mamadou_Diako.html", "Mamadou_Faye.html", "Mamadou_Kebe.html", "Mame_Cheikh_Diallo.html", "Mame_Gueye.html", "Mame_Mor_Ndiaye.html", "Maniche.html", "Mansour_Gueye.html", "Mansour_Samb.html", "Mansour_Sinyan.html", "Manu_Toledano.html", "Manuel_A_Rodriguez.html", "Manuel_Afonso_Correia.html", "Manuel_Aguilar.html", "Manuel_Akanji.html", "Manuel_Alejandro_Cisterna.html", "Manuel_Alves_Pentigado.html", "Manuel_Amado_Maia_Moreira_de_Sá.html", "Manuel_Amoros.html", "Manuel_António_Costa_Guimarães.html", "Manuel_Avedikian.html", "Manuel_Carlos_Moreira_da_Silva.html", "Manuel_Edrinha_Bento.html", "Manuel_Esteban_Serrano.html", "Manuel_Eurico_Gonçalves_dos_Santos.html", "Manuel_Fernando_Nendes.html", "Manuel_Fernando_da_Silva_Teixeira.html", "Manuel_Gomes_da_Silva.html", "Manuel_Guerrero.html", "Manuel_Inácio_da_Silva_Filho.html", "Manuel_Jacinto_Nogueira_Sardinha.html", "Manuel_Joaquim_Fernandes_Araújo.html", "Manuel_Joaquim_Fernandes_de_Oliveira.html", "Manuel_José_Martins_Oliveira.html", "Manuel_Neuer.html", "Manuel_Nogueira.html", "Manuel_Pereyra.html", "Manuel_Rodrigues_dos_Anjos.html", "Manuel_Rui_Madeira_Rogado.html", "Manuel_Sanchis_Jr.html", "Manuel_Sanchis_Sr.html", "Manuel_Serrano.html", "Manuel_Tutu.html", "Manuel_Yendare.html", "Manuel_dos_Santos.html", "Mapi_Leon.html", "Marc-Vivien_Foé.html", "Marc_Andrieux.html", "Marc_Delaroche.html", "Marc_Keller.html", "Marc_Malifroy.html", "Marc_Morgante.html", "Marc_Pascal.html", "Marcel_Canadi.html", "Marcel_Desailly.html", "Marcel_Dib.html", "Marcelino_Moreno.html", "Marcelino_Rene_Galoppo.html", "Marcelino_Ñamandu_Arias.html", "Marcelo_A_Da_Rosa.html", "Marcelo_A_De_Souza.html", "Marcelo_Aldape.html", "Marcelo_Alejandro_Flores.html", "Marcelo_Alejandro_Misetich.html", "Marcelo_Alfredo_Benitez.html", "Marcelo_Anibal_Botana.html", "Marcelo_Arnaldo_Santoni.html", "Marcelo_Astegiano.html", "Marcelo_Barrera.html", "Marcelo_Broggi.html", "Marcelo_Capuzzi.html", "Marcelo_Cardozo.html", "Marcelo_Carracedo.html", "Marcelo_Carrera.html", "Marcelo_Dallacosta.html", "Marcelo_Daniel_Quinones.html", "Marcelo_De_Ciancio.html", "Marcelo_Delgado.html", "Marcelo_Djian.html", "Marcelo_Donato_Bruno.html", "Marcelo_Dopico.html", "Marcelo_Ernesto_Broggi.html", "Marcelo_Escudero.html", "Marcelo_F_Asteggiano.html", "Marcelo_Fabian_Morales.html", "Marcelo_Fabian_Placereano.html", "Marcelo_Fabián_Espina.html", "Marcelo_Fabián_Suarez.html", "Marcelo_Flores.html", "Marcelo_Franchini.html", "Marcelo_Gabriel_Paolino.html", "Marcelo_Gallardo.html", "Marcelo_Glinni.html", "Marcelo_Gomez.html", "Marcelo_Gonzalez.html", "Marcelo_Goux.html", "Marcelo_Herrera.html", "Marcelo_Ielsich.html", "Marcelo_Javier_Benitez.html", "Marcelo_Jorge_Reggiardo.html", "Marcelo_Kobistyj.html", "Marcelo_Ledesma.html", "Marcelo_Leonardo_Couceiro.html", "Marcelo_Lopez.html", "Marcelo_Luis_Gomez.html", "Marcelo_Luis_Trapasso.html", "Marcelo_Manzano.html", "Marcelo_Micetich.html", "Marcelo_Mottura.html", "Marcelo_Omar_Caviglia.html", "Marcelo_Pastorini.html", "Marcelo_Pontiroli.html", "Marcelo_Quiñones.html", "Marcelo_Ramirez.html", "Marcelo_Romagnoli.html", "Marcelo_Rotti.html", "Marcelo_Ruben_Schenker.html", "Marcelo_Salas.html", "Marcelo_Saralegui.html", "Marcelo_Saralegui_Arregin.html", "Marcelo_Sergei_Dapueto.html", "Marcelo_Stocco.html", "Marcelo_Toscanelli.html", "Marcelo_Trimarchi.html", "Marcelo_Trivisonno.html", "Marcelo_Trobbiani.html", "Marco_Antonio_Cate.html", "Marco_António_Faria.html", "Marco_Asensio.html", "Marco_Aurélio_Poixe.html", "Marco_Baixinho.html", "Marco_Elsner.html", "Marco_Fabián.html", "Marco_Grassi.html", "Marco_Osio.html", "Marco_Paulo_Araújo_Sócio.html", "Marco_Van_Basten.html", "Marcos_António_Gomes.html", "Marcos_António_Verdeano.html", "Marcos_Capocetti.html", "Marcos_Fernandez.html", "Marcos_Gerardo_Rodriguez.html", "Marcos_Guillermo_Samso.html", "Marcos_Gutierrez.html", "Marcos_Leonardo.html", "Marcos_Llorente.html", "Marcos_Lopez.html", "Marcos_Marcelo_Tejera.html", "Marcos_Senesi.html", "Marcos_de_Matos_Lopes.html", "Marculino_Ninte.html", "Marcus_Rashford.html", "Marcus_Thuram.html", "Marcus_Traore.html", "Marcílio_Luís_Evangelista_dos_Santos.html", "Marek_Hamsik.html", "Marek_Jankulovski.html", "Mariano_Alcides_Juan.html", "Mariano_Alvarado.html", "Mariano_Andrés_Armentano.html", "Mariano_Aponte.html", "Mariano_Campodonico.html", "Mariano_Dalla_Libera.html", "Mariano_Dallalibera.html", "Mariano_Fossas.html", "Mariano_Hernán_Montefiore.html", "Mariano_Javier_Aponte.html", "Mariano_Manzanel.html", "Mariano_Messera.html", "Mariano_Montefiori.html", "Mariano_Vignolo.html", "Marie-Antoinette_Katoto.html", "Marin_Pongracic.html", "Marino_Hinestroza.html", "Mario_Acuña.html", "Mario_Alberto.html", "Mario_Alberto_Cortez.html", "Mario_Alberto_Rebollo.html", "Mario_Alberto_Sanchez.html", "Mario_Alberto_Vanemerak.html", "Mario_Alberto_Vanemerak_2.html", "Mario_Alfonso_Ballarino.html", "Mario_Bruno_Lucca.html", "Mario_Cariaga.html", "Mario_Conti.html", "Mario_Corian.html", "Mario_Cortez.html", "Mario_César_Ramirez.html", "Mario_Eduardo_Alberto.html", "Mario_Eduardo_Bevilacqua.html", "Mario_Enrique_Cariaga.html", "Mario_Escudero.html", "Mario_Gastan.html", "Mario_Hernán_Videla.html", "Mario_Humberto_Lobo.html", "Mario_J_Celli.html", "Mario_José_Gori.html", "Mario_Kempes.html", "Mario_Lucca.html", "Mario_Luis_Baralle.html", "Mario_Maiorani.html", "Mario_Marcelo_Carballo.html", "Mario_Pobersnik.html", "Mario_Raúl_Villegas.html", "Mario_Relmy.html", "Mario_Rolando_Escudero.html", "Mario_Saccone.html", "Mario_Saralegui.html", "Mario_Saralegui_Emelec.html", "Mario_Stroeykens.html", "Mario_Tarzia.html", "Mario_Vanemerak.html", "Mario_Videla.html", "Mark_Hateley.html", "Marko_Mlinaric.html", "Markus_Karlsson.html", "Marlon_Eduardo_Reis_Alves.html", "Marlon_Mustapha.html", "Marsol_Arias_Sanchez.html", "Martim_Costa.html", "Martin_Arzuaga.html", "Martin_Boakye.html", "Martin_Cardetti.html", "Martin_Colman.html", "Martin_Cuellar.html", "Martin_Djetou.html", "Martin_Koeman.html", "Martin_Morel.html", "Martin_Nils_David_Holmberg.html", "Martin_Vazquez.html", "Martin_Zubimendi.html", "Martiniano_Irribarría.html", "Martín_Alarcon.html", "Martín_Alejandro_Aguirre.html", "Martín_Boasso.html", "Martín_Cardetti.html", "Martín_Comminges.html", "Martín_Eduardo_Ligori.html", "Martín_Furiga.html", "Martín_Félix_Ubaldi.html", "Martín_Mazzucco.html", "Martín_Palermo.html", "Martín_Posse.html", "Martín_Rastelli.html", "Martín_Roberto_Mandra.html", "Martín_Roman.html", "Martín_Sebastián_Bermejo.html", "Martín_Vilallonga.html", "Marvel.html", "Marvin_Gathuessi.html", "Mason_Greenwood.html", "Mass_Sise.html", "Massaoly_Diarra.html", "Massimo_Oddo.html", "Matej_Kovar.html", "Mateo_Karamatic.html", "Mateusz_Wieteska.html", "Matheo_Lima.html", "Mathias_Delorge.html", "Mathias_Haarup.html", "Mathias_Sindelar.html", "Mathis_Abline.html", "Mathis_Jangeal.html", "Mathys_Detourbet.html", "Mathys_Saban.html", "Mathys_Tel.html", "Matias_Lamhauge.html", "Matias_Satas.html", "Matija_Frigan.html", "Matte_Smets.html", "Matteo_Lovato.html", "Matteo_Palma.html", "Matteo_Waem.html", "Matthias_Sammer.html", "Matthieu_Da_Silva.html", "Matthieu_Louis-Jean.html", "Mattis_Seghers.html", "Matías_Biscay.html", "Matías_Jesús_Almeyda.html", "Maurice_Bouquet.html", "Maurice_Johnston.html", "Mauricio_Ariel_Arias.html", "Mauricio_Basso.html", "Mauricio_Esquivel.html", "Mauricio_Gonzalez.html", "Mauricio_Hanuch.html", "Mauricio_Hugo_Piersimone.html", "Mauricio_Héctor_Pineda.html", "Mauricio_Oggioni.html", "Mauricio_Pellegrino.html", "Mauricio_Pineda.html", "Mauricio_Risso.html", "Mauricio_Roberto_Pochettino.html", "Mauro_Amato.html", "Mauro_Gabriel_Airez.html", "Mauro_Gerk.html", "Mauro_Hernán_Levy.html", "Mauro_Icardi.html", "Mauro_Junior.html", "Mauro_Navas.html", "Mauro_Potenzoni.html", "Mauro_Ramos.html", "Max_Bowman.html", "Max_Caputo.html", "Maxence_Flachez.html", "Maxence_Gazon.html", "Maxence_Maisonneuve.html", "Maxima_Goffi.html", "Maxime_Bossis.html", "Maxime_De_Cuyper.html", "Maxime_Foulon.html", "Maximilian_Braun.html", "Maximilian_Ibrahimovic.html", "Maximiliano_Amondarain.html", "Maximiliano_Cuberas.html", "Maximo_Perrone.html", "McNelly_Torres.html", "Mehdi_Mchakhchekh.html", "Mehmed_Bazdarevic.html", "Mehmet_Ozcan.html", "Memo_Rodriguez.html", "Merheg.html", "Mesaque_Dju.html", "Metrics_Glossary.html", "Michael_Essien.html", "Michael_Laudrup.html", "Michael_Manniche.html", "Michael_Owen.html", "Michael_Ódrio_Bunn.html", "Michaël_Debeve.html", "Michaël_Madar.html", "Michaël_Mio_Nielsen.html", "Michel_Aebischer.html", "Michel_Bensoussan.html", "Michel_Bibard.html", "Michel_Catalano.html", "Michel_Der_Zakarian.html", "Michel_Deza.html", "Michel_Dussuyer.html", "Michel_Engel.html", "Michel_Ettore.html", "Michel_Gonzalez.html", "Michel_Milojevic.html", "Michel_Pavon.html", "Michel_Platini.html", "Michel_Rio.html", "Michel_Sorin.html", "Mickaël_Debève.html", "Mickaël_Garciau.html", "Mickaël_Madar.html", "Mickaël_Marsiglia.html", "Migue_Barbat.html", "Miguel_Alberto_Amaya.html", "Miguel_Alberto_Fernandes_Marques.html", "Miguel_Alfredo_Jerez.html", "Miguel_Almiron.html", "Miguel_Angel_Abrigo.html", "Miguel_Angel_Barrios.html", "Miguel_Angel_Castrellon.html", "Miguel_Angel_Colombatti.html", "Miguel_Angel_Fullana.html", "Miguel_Angel_Gambier.html", "Miguel_Angel_Ibáñez.html", "Miguel_Angel_Ludueña.html", "Miguel_Angel_Ortola.html", "Miguel_Angel_Russo.html", "Miguel_Angel_Saiz.html", "Miguel_Angel_Santos.html", "Miguel_António_Gomes_Ribeiro.html", "Miguel_Ballejo.html", "Miguel_Barrios.html", "Miguel_Bianculli.html", "Miguel_Cejas.html", "Miguel_Colombatti.html", "Miguel_Crespo.html", "Miguel_Fullana.html", "Miguel_Gambier.html", "Miguel_Gasparoni.html", "Miguel_Lemme.html", "Miguel_Ludueña.html", "Miguel_Luis_Elsesser.html", "Miguel_López.html", "Miguel_Macri.html", "Miguel_Merentiel.html", "Miguel_Mesone.html", "Miguel_Oviedo.html", "Miguel_Pardeza.html", "Miguel_Pineda.html", "Miguel_Reinoso.html", "Miguel_Robinson_Hernandez.html", "Miguel_Robles.html", "Miguel_Russo.html", "Miguel_Vargas.html", "Miguel_Wirzst.html", "Miguel_de_la_Fuente.html", "Miguel_Ângelo_P._Oliveira.html", "Mihajlo_Cvetkovic.html", "Mika_Godts.html", "Mikaël_Silvestre.html", "Mikel_Alonso.html", "Mikel_Amondarain.html", "Mikel_Gogorza.html", "Miladin_Bečanović.html", "Milos_Bursac.html", "Milos_Djelmas.html", "Milton_A_Gomez.html", "Milton_Coimbra_Zulzer.html", "Milton_Delgado.html", "Milton_Hieraldo_Costa.html", "Milton_Melgar_Soruco.html", "Mirko_Saric.html", "Mirko_Saric_1978.html", "Miroslav_Klose.html", "Mirza_Varešanović.html", "Modibo_Sagnan.html", "Mohamed_Chadouch.html", "Mohamed_Chaouch.html", "Mohamed_Elyounoussi.html", "Mohamed_Nassoh.html", "Mohamed_Ouadah.html", "Mohamed_Salah.html", "Mohamed_Sylla.html", "Mohamed_Zouaoui.html", "Mohammed_Chaouch.html", "Mohammed_Lashaf.html", "Moise_Kean.html", "Mokio.html", "Momodou_Sarr.html", "Morgan_Gibbs_White.html", "Moritz_Wels.html", "Morlaye_Soumah.html", "Moro.html", "Morufdeen_Moshood.html", "Moses_Opondo.html", "Mouhamed_Dosso.html", "Moussa_NDiaye.html", "Moussa_Saïb.html", "Moussa_Senghor.html", "Moussa_Traore.html", "Moïse_Regina.html", "Murad_Djellatian.html", "Musa_Drammeh.html", "Mustafa_Hekimoglu.html", "Mustapha_El_Hadaoui.html", "Mustapha_El_Haddaoui.html", "Mutiu_Adepoju.html", "Mwepu_Ilunga.html", "Myron_Boadu.html", "Márcio_do_Nascimento_Martins.html", "Mário_Augusto_C._Santos_Braga.html", "Mário_Jorge_da_Silva_Pinto_Fernandes.html", "Mário_Marques_Coelho.html", "Mário_Newton_Monteiro_Morais.html", "Mário_Tito_Santos_Matos.html", "Máximo_Raúl_Nardoni.html", "N'Dinga_Mbutu.html", "N'Rama_Mendonne.html", "N'Torino_Oliveira_Betinho.html", "Nacho_Ferri.html", "Nachon_Nsingi.html", "Nader_Ghandri.html", "Nagdi_Abdel-Ghamy_Sajyed_Ahmed.html", "Nahuel_Molina.html", "Namadu_Bobó_Ojão.html", "Nando_Martinez.html", "Nasco_Manuel_da_Cruz_Alves.html", "Nathan_Bourdin.html", "Nathan_De_Cat.html", "Nathan_Dylan_Saliba.html", "Nathan_Harriel.html", "Nathan_Zeze.html", "Nathanael_Saintini.html", "Nayrobi_Vargas.html", "Nazaro_Eugénio_Mariano.html", "Nazeem_Bartman.html", "Ndaye_Mulamba.html", "Nebosja_Gudelj.html", "Neco_Williams.html", "Neider_Morantes.html", "Nelinho.html", "Nelson_Acosta.html", "Nelson_Agoglia.html", "Nelson_Alcides_Cabrera.html", "Nelson_António_Bertolazzi.html", "Nelson_Borges_de_Freitas.html", "Nelson_D_Brissolese.html", "Nelson_David_Vivas.html", "Nelson_Gutierrez.html", "Nelson_Osvaldo_Rosane.html", "Nelson_Vivas.html", "Nemanja_Gudelj.html", "Nery_Pumpido.html", "Nestor_Fabbri.html", "Nestor_Gorosito.html", "Nestor_Jose_Merlo.html", "Nestor_Raul_Gorosito.html", "Nestor_Rossi.html", "Nestor_Sensini.html", "Neymar_Jr.html", "Neymar_Junior.html", "Neymar_Uribe.html", "Ngolo_Kante.html", "Niccolo_Pisilli.html", "Niccolo_Tresoldi.html", "Nick_Woltemade.html", "Nico_Gonzalez.html", "Nicolas_Andermatt.html", "Nicolas_Anelka.html", "Nicolas_Bastere.html", "Nicolas_Benedetti.html", "Nicolas_Esceth-N'Zi.html", "Nicolas_Gennarielli.html", "Nicolas_Huysman.html", "Nicolas_Laspalles.html", "Nicolas_Ouédec.html", "Nicolas_Perez.html", "Nicolas_Savinaud.html", "Nicolas_Seiwald.html", "Nicolo_Barrella.html", "Nicolo_Tresoldi.html", "Nicolás_Andrés_Parada.html", "Nicolás_Diez.html", "Nicolás_Lauria_Calvo.html", "Nicolás_Paz.html", "Nicolás_Tagliani.html", "Nigino_Rezende_Silvino_Gaspar.html", "Nils_Magnusson.html", "Nilton_Edgar_Pardal.html", "Nilton_Santos.html", "Nimetigna_Sacko.html", "Ninaldo_Câmara_Sousa.html", "Nishan_Burkart.html", "Nitor_Eduardo_Vera_Pinto.html", "Nitor_Manuel_Abrunhosa_Rodrigues.html", "Nivaldo_Gomes_da_Silva.html", "Nião_da_Silva.html", "Noa_Hinard.html", "Noah_Fernandez.html", "Noah_Nartey.html", "Noe_Lebreton.html", "Norbert_Almandoz.html", "Norbert_Nachtweih.html", "Norberto_Alonso.html", "Norberto_Callipo.html", "Norberto_Fernandez.html", "Norberto_Gabriel_Alonso.html", "Norberto_Hugo_Scoponi.html", "Norberto_Hugo_Toledo.html", "Norberto_Ortega_Sanchez.html", "Norberto_Ortega_Sanchez_Platense.html", "Norberto_Ortega_Sanchez_San_Lorenzo_De_Almagro.html", "Norberto_Scopponi.html", "Norberto_Sebastián_Callipo.html", "Norberto_Testa.html", "Norman_Bassette.html", "Noël_Antoine_Sagna.html", "Nunzio_Egwanda.html", "Nwankwo_Kanu.html", "Nénad_Stojkovic.html", "Néstor_Adrián_De_Vicente.html", "Néstor_Aníbal_Sassone.html", "Néstor_Ariel_Fabbri.html", "Néstor_Blanco.html", "Néstor_Cataldo.html", "Néstor_Cedres_Vera.html", "Néstor_Clausen.html", "Néstor_Craviotto.html", "Néstor_Dario_Giacinti.html", "Néstor_De_Vicente.html", "Néstor_Emilio_Soria.html", "Néstor_F_Viera.html", "Néstor_Fabbri.html", "Néstor_Fabián_Benedetich.html", "Néstor_Fabián_Correa.html", "Néstor_Fernando_Villarreal.html", "Néstor_Gabriel_Cedrés.html", "Néstor_Gabriel_Lorenzo.html", "Néstor_Gorosito.html", "Néstor_Lorenzo.html", "Néstor_Maidana.html", "Néstor_Marquez.html", "Néstor_Montelongo.html", "Néstor_Omar_Martin.html", "Néstor_Oscar_Craviotto.html", "Néstor_Osvaldo_González.html", "Néstor_Piccoli.html", "Néstor_Raúl_Gorosito.html", "Néstor_Rolando_Clausen.html", "Néstor_Sicher.html", "Obdulio_E_Trasante.html", "Obdulio_Varela.html", "Oguzhan_Ozyakup.html", "Ole_Werner.html", "Oleg_Blokhin.html", "Oleksandr_Piscsur.html", "Oleksandr_Pyshcsur.html", "Oleksandr_Zinchenko.html", "Olivera_Gudelj.html", "Olivier_Bellisi.html", "Olivier_Dacourt.html", "Olivier_Dall'Oglio.html", "Olivier_De_Luca.html", "Olivier_Debert.html", "Olivier_Fugen.html", "Olivier_Ichoua.html", "Olivier_Kemen.html", "Olivier_Pedemas.html", "Olivier_Peres.html", "Olivier_Pichard.html", "Olivier_Vandevoorde.html", "Ollie_Watkins.html", "Omar_Arnaldo_Palma.html", "Omar_Asad.html", "Omar_Barrientos.html", "Omar_Bastia.html", "Omar_Bordet.html", "Omar_Cabral.html", "Omar_Da_Fonseca.html", "Omar_Darío_Cabral.html", "Omar_Gauna.html", "Omar_Joaquín_Cabral.html", "Omar_Palma.html", "Omar_Pedernera.html", "Omar_Rios.html", "Omar_Sivori.html", "Omar_Séné.html", "Omar_Wilmar_Hernandez.html", "Orkun_Kokcu.html", "Orlando_A_Carballo.html", "Orlando_Luís_Manciel.html", "Orlando_Ruiz.html", "Ornaldo_Claut.html", "Oscar_Acosta.html", "Oscar_Agonil.html", "Oscar_Aguilar.html", "Oscar_Aguirregaray.html", "Oscar_Alberto_Olivera.html", "Oscar_Albornoz.html", "Oscar_Alfredo_Garre.html", "Oscar_Alfredo_Osorio.html", "Oscar_Alfredo_Ruggeri.html", "Oscar_Alfredo_Ruggeri_San_Lorenzo_De_Almagro.html", "Oscar_Alsina_Hornos.html", "Oscar_Alvarez_Sanjuan.html", "Oscar_Americo_Agonil.html", "Oscar_Arevalo.html", "Oscar_Comas.html", "Oscar_Craiyacich.html", "Oscar_Denis.html", "Oscar_Dertycia.html", "Oscar_Fernando_Passet.html", "Oscar_Fernando_Passet_2.html", "Oscar_Fernando_Passet_San_Lorenzo_De_Almagro.html", "Oscar_Ferro_Gandara.html", "Oscar_Garre.html", "Oscar_Gil.html", "Oscar_Gissi.html", "Oscar_Gloukh.html", "Oscar_Gomez.html", "Oscar_Julio_Ferro.html", "Oscar_Limia.html", "Oscar_Mena.html", "Oscar_Milton_Alsina.html", "Oscar_Olivera.html", "Oscar_Passet.html", "Oscar_Passet_San_Lorenzo.html", "Oscar_Ponce.html", "Oscar_Regenhardt.html", "Oscar_Rifourcat.html", "Oscar_Roberto_Alfonso.html", "Oscar_Roberto_Tedini.html", "Oscar_Román_Acosta.html", "Oscar_Ruggeri.html", "Oscar_Suarez.html", "Oscar_Tedini.html", "Oscar_Vera.html", "Oskar_Pietuszewski.html", "Osmundino_Carlos_Queiróz_Monteiro.html", "Osvaldo_Alves_Santos.html", "Osvaldo_Ardiles.html", "Osvaldo_Costa_Cardoso_Pinto.html", "Osvaldo_Escudero.html", "Osvaldo_F_Canobbio.html", "Osvaldo_Francisco_Canobbio.html", "Osvaldo_G._Rodriguez.html", "Osvaldo_Hector_Rodriguez.html", "Osvaldo_Ingrao.html", "Osvaldo_Inre_Coloccini.html", "Osvaldo_Javier_Sodero.html", "Osvaldo_Jorge_Pereyra.html", "Osvaldo_Lúcio_Claudino.html", "Osvaldo_Marquez.html", "Osvaldo_Miguel_Marquez.html", "Osvaldo_Rodriguez.html", "Osvaldo_Ruben_Ozzan.html", "Osvaldo_Salvador_Escudero.html", "Osvaldo_Scigliano.html", "Osvaldo_Tempesta.html", "Osério_Andrade_da_Cruz.html", "Otto_Tiittinen.html", "Oumar_Dieng.html", "Oumar_Sene.html", "Ousmane_Dabo.html", "Oussama_El_Azzouzi.html", "Ozan_Kabak.html", "Pablo_Aimar.html", "Pablo_Alberto_Bocco.html", "Pablo_Alejandro_Acevedo.html", "Pablo_Alejandro_Correa.html", "Pablo_Alfaro.html", "Pablo_Andrés_Caballero.html", "Pablo_Andrés_Sánchez.html", "Pablo_Antonio_Gomez.html", "Pablo_Ariel_Paz.html", "Pablo_Bezombe_Boaglio.html", "Pablo_Cardenas.html", "Pablo_Carlos_Erbin.html", "Pablo_Cavallero.html", "Pablo_César_Fernández.html", "Pablo_César_Goberville.html", "Pablo_Daniel_Galiano.html", "Pablo_Emilio_Perez.html", "Pablo_Erbin.html", "Pablo_Fernandez.html", "Pablo_Fernando_Cappelletti.html", "Pablo_Fiorentini.html", "Pablo_Fretes.html", "Pablo_German_Dialeva.html", "Pablo_Gioffre.html", "Pablo_Guede.html", "Pablo_Hernán_Lavallen.html", "Pablo_Islas.html", "Pablo_Javier_Morant.html", "Pablo_L_Reggio.html", "Pablo_Marcelo_Bezombe.html", "Pablo_Marmisolle.html", "Pablo_Michelini.html", "Pablo_Navarro.html", "Pablo_Quatrocchi.html", "Pablo_Rodriguez.html", "Pablo_Rotchen.html", "Pablo_Sixto_Suarez.html", "Pablo_Taborda.html", "Pablo_Talarico.html", "Pablo_Trobbiani.html", "Pamela_Ballivian.html", "Panagiotis_Tsivikos.html", "Pantelis_Hatzidiakos.html", "Paolo_Futre.html", "Paolo_Guerrero.html", "Paolo_Maldini.html", "Paolo_Rossi.html", "Pape_Diong.html", "Pape_Fall.html", "Paris_Irie.html", "Paris_Nakajima_Farran.html", "Pascal_Baills.html", "Pascal_Bedrossian.html", "Pascal_Bocquillon.html", "Pascal_Braud.html", "Pascal_Cygan.html", "Pascal_Despeyroux.html", "Pascal_Dupraz.html", "Pascal_Françoise.html", "Pascal_Fugier.html", "Pascal_Gastien.html", "Pascal_Grosbois.html", "Pascal_Harmand.html", "Pascal_Janin.html", "Pascal_Nouma.html", "Pascal_Olmeta.html", "Pascal_Pierre.html", "Pascal_Plancque.html", "Pascal_Rousseau.html", "Pascal_Vahirua.html", "Pascual_Alfredo_Noriega.html", "Pascual_Noriega.html", "Patri_Guijarro.html", "Patrice_Carteron.html", "Patrice_Eyraud.html", "Patrice_Ferri.html", "Patrice_Garande.html", "Patrice_Lagadec.html", "Patrice_Lestage.html", "Patrice_Loko.html", "Patrice_Marquet.html", "Patrice_Monteilh.html", "Patrice_Sauvaget.html", "Patricio_Andrés_Graff.html", "Patricio_Arizaga.html", "Patricio_Bedrossian.html", "Patricio_Camps.html", "Patricio_Fernandez.html", "Patricio_Hernandez.html", "Patrick_Amrane.html", "Patrick_Battiston.html", "Patrick_Blondeau.html", "Patrick_Colleter.html", "Patrick_Collot.html", "Patrick_Cubaynes.html", "Patrick_Delamontagne.html", "Patrick_Desseaux.html", "Patrick_Kluivert.html", "Patrick_M'Boma.html", "Patrick_Moreau.html", "Patrick_Revelles.html", "Patrick_Valéry.html", "Patrick_Vervoort.html", "Patrick_Vieira.html", "Patrik_Mercado.html", "Pau_Cubarsi.html", "Pau_Juventeny.html", "Paul_Fischer.html", "Paul_Gascoigne.html", "Paul_Le_Guen.html", "Paul_Mc_Grath.html", "Paul_Scholes.html", "Paul_Van_Himst.html", "Paul_Wanner.html", "Paulo_Alexandre_Cristóvão_Santos.html", "Paulo_Alexandre_Pinho_Lopes.html", "Paulo_Bonato_Alves_Silva_Bernardo.html", "Paulo_César_da_Silva.html", "Paulo_Do_Prado_Pereira.html", "Paulo_Egídio_Bertolazzi.html", "Paulo_Falcao.html", "Paulo_Henrique_S._de_Oliveira_Junior.html", "Paulo_Henrique_da_Cunha_Antunes.html", "Paulo_Humberto_P._Silva_da_Silva.html", "Paulo_Jorge_Cónsia_Monteiro.html", "Paulo_Jorge_Nunes_Ferreirinha.html", "Paulo_Jorge_Oliveira_Martins.html", "Paulo_Jorge_Pereira_de_Sousa.html", "Paulo_Jorge_Ribeiro_Magalhães.html", "Paulo_Jorge_Roque_Marques.html", "Paulo_Jorge_Rosário_Vasconcelos.html", "Paulo_Jorge_da_Rocha_Mota.html", "Paulo_Jorge_do_Carmo_Nídius.html", "Paulo_Manuel_Riana_Nunes.html", "Paulo_Marçal_Campos.html", "Paulo_R._Bucinello.html", "Paulo_Ricardo_Nordini.html", "Paulo_Ricardo_dos_Santos.html", "Paulo_Roberto_S._Almeida.html", "Paulo_Roberto_Silas.html", "Paulo_Rogério_da_Silva.html", "Paulo_Silas.html", "Paulo_Silas_Do_Prado_Pereira.html", "Paulo_Silas_de_Prado_Pereira.html", "Paulo_Sérgio_Beloti.html", "Paulo_Sérgio_Genta_de_Brito.html", "Paulo_Sérgio_Rodrigues_Firmino.html", "Pavel_Nedved.html", "Pedro_Aguirrez.html", "Pedro_Alexandre_N._Caldas_Xavier.html", "Pedro_Argota.html", "Pedro_Barrios_Delgado.html", "Pedro_Catalano.html", "Pedro_Catalano_2.html", "Pedro_Cea.html", "Pedro_Damián_Monzon.html", "Pedro_Daniel_Barrios.html", "Pedro_Denglefredo.html", "Pedro_Diniz.html", "Pedro_Do_Rio.html", "Pedro_Fernando_Massacessi.html", "Pedro_Goncalves.html", "Pedro_Goncalves_Pote.html", "Pedro_Gonçalves.html", "Pedro_Ignacio_Salaberry.html", "Pedro_Larraquy.html", "Pedro_Magallanes.html", "Pedro_Manuel_Araújo_Mesquita.html", "Pedro_Manuel_Rogeirão_Venâncio.html", "Pedro_Massacessi.html", "Pedro_Monzon.html", "Pedro_Neto.html", "Pedro_Nuno.html", "Pedro_Olalla.html", "Pedro_Ortega.html", "Pedro_Ortiz.html", "Pedro_Raul.html", "Pedro_Romoli.html", "Pedro_Sanchez.html", "Pedro_Sarabia.html", "Pedro_Sarabia_Achucarro.html", "Pedro_Silva.html", "Pedro_Troglio.html", "Pedro_Uliambre.html", "Pedro_Virgilio_Rocha.html", "Pegguy_Arphexad.html", "Pele.html", "Pepelu.html", "Percy_Olivares.html", "Periko_Alonso.html", "Pervis_Estupinan.html", "Petar_Petrovic.html", "Petar_Sucic.html", "Peter_Boisz.html", "Peter_Bosz.html", "Peter_Gulacsi.html", "Peter_Ndlovu.html", "Peter_Reichert.html", "Peter_Schmeichel.html", "Peter_Simon_Barnes.html", "Peter_Van_Vulzoh.html", "Peter_Wynhoff.html", "Phalguni_Singh.html", "Philip_Murphy.html", "Philip_Zinckernagel.html", "Philipe_Leocardus_Walker.html", "Philipp_Lahm.html", "Philipp_Otele.html", "Philippe_Anziani.html", "Philippe_Avenet.html", "Philippe_Barraud.html", "Philippe_Brunel.html", "Philippe_Carvalho.html", "Philippe_Celdran.html", "Philippe_Correia.html", "Philippe_Cuervo.html", "Philippe_Delaye.html", "Philippe_Desmet.html", "Philippe_Durpes.html", "Philippe_Fargeon.html", "Philippe_Flucklinger.html", "Philippe_Gaillot.html", "Philippe_Hinschberger.html", "Philippe_Jeannol.html", "Philippe_Levenard.html", "Philippe_Lucas.html", "Philippe_Mazzuchetti.html", "Philippe_Montanier.html", "Philippe_Morin.html", "Philippe_N'Dioro.html", "Philippe_Perilleux.html", "Philippe_Raschke.html", "Philippe_Schuth.html", "Philippe_Sence.html", "Philippe_Sénac.html", "Philippe_Thys.html", "Philippe_Tibeuf.html", "Philippe_Var.html", "Philippe_Vercruysse.html", "Philippe_Violeau.html", "Picas.html", "Pierino_Lattuada.html", "Pierre-Yves_André.html", "Pierre-Yves_Bricon.html", "Pierre-Yves_Brucon.html", "Pierre_Aubameyang.html", "Pierre_Bastou.html", "Pierre_Chavrondier.html", "Pierre_Dregozi.html", "Pierre_Dreossi.html", "Pierre_Ducrocq.html", "Pierre_Espanol.html", "Pierre_Gabzdyl.html", "Pierre_Haon.html", "Pierre_Laigle.html", "Pierre_Laurent.html", "Pierre_Maroselli.html", "Pierre_Morice.html", "Pierre_Reynaud.html", "Pierrick_Hiard.html", "Pieter_Den_Boer.html", "Pietro_Comuzzo.html", "Piotr_Świerczewski.html", "Pizzuti.html", "Precious_Ugwu.html", "Predrag_Radosavljevic.html", "Promise_David.html", "Prosper_Peter.html", "Próspero_Silva.html", "Quinten_Timber.html", "Quique_Alvarez_Sanjuan.html", "Quique_Costas.html", "Rabah_Madjer.html", "Racine_Kane.html", "Radoslav_Zdravkov.html", "Rafael_Alberto_Luongo.html", "Rafael_Bianchi_Gandin.html", "Rafael_Bobadilla.html", "Rafael_Diaz.html", "Rafael_Dudamel.html", "Rafael_Luongo.html", "Rafael_Maceratessi.html", "Rafael_Martin_Vazquez.html", "Rafik_Belghali.html", "Raheem_Sterling.html", "Raimundo_Nonato_Magalhães_Barros.html", "Raimundo_Orsi.html", "Ralph_Pinotti_Strange.html", "Ramiro_Castillo.html", "Ramiro_Castillo_2.html", "Ramiro_Funes_Mori.html", "Ramon_Alfredo_Escobar.html", "Ramon_Angel_Bernuncio.html", "Ramon_Angel_Diaz.html", "Ramon_Benito_Alvarez.html", "Ramon_Diaz.html", "Ramon_Ismael_Medina_Bello.html", "Ramon_Medina_Bello.html", "Ramón_Alvarez.html", "Ramón_Andrés_Escobar.html", "Ramón_Centurion.html", "Ramón_Darío_Larrosa.html", "Ramón_Ismael_Medina_Bello.html", "Ramón_Medina_Bello.html", "Ramón_Miguel_Centurion.html", "Raphael_Aguerre.html", "Raphael_Onyedika.html", "Raphael_Sarfo.html", "Raphaël_Camacho.html", "Raphaël_Guerreiro.html", "Raul_Estevez.html", "Raul_Gonzalez.html", "Raul_Mendes_Duarte.html", "Raul_Ricardo_Valdez.html", "Raul_Roque_Alfaro.html", "Ray_Stephen.html", "Rayan.html", "Rayan_Cherki.html", "Rayane_Bounida.html", "Rayane_Jerbi.html", "Raymond_Kopa.html", "Raymond_Owusu.html", "Raí.html", "Raúl_Agustín_Armando.html", "Raúl_Andrés_Cesar.html", "Raúl_Aviles.html", "Raúl_Cardozo.html", "Raúl_Chaparro.html", "Raúl_Cristian_Chaparro.html", "Raúl_E_Falero.html", "Raúl_Edmundo_Wensel.html", "Raúl_Eduardo_Gordillo.html", "Raúl_Enrique_Estevez.html", "Raúl_Estevez.html", "Raúl_F_Bergara.html", "Raúl_Garcia.html", "Raúl_Grimoldi.html", "Raúl_Gudiño.html", "Raúl_Heriberto_Aredes.html", "Raúl_Maradona.html", "Raúl_Nicolás_Recalde.html", "Raúl_O_Otero.html", "Raúl_Oyola.html", "Raúl_Peralta.html", "Raúl_Ricardo_Dos_Santos.html", "Raúl_Sebastián_Ruiz.html", "Redouane_Belkaious.html", "Regeer.html", "Reginaldo_Ramires.html", "Regis_Salmazzo.html", "Renato_Corsi.html", "Renato_Corsi_2.html", "Rene_Higuita.html", "René_Alberto_Gomez.html", "René_Carlos_Eduardo_Kloker.html", "René_Cunho_Kraas.html", "René_Marsiglia.html", "René_Zamora.html", "Resink_Stije_EmpireFGA_Card.html", "Reto_Ziegler.html", "Reynald_Pedros.html", "Reynis_Filipa.html", "Ricardo_Alberto_Gareca.html", "Ricardo_Alberto_Ramírez.html", "Ricardo_Alexandre_Gomes_Ladeira.html", "Ricardo_Altamirano.html", "Ricardo_Bochini.html", "Ricardo_C_Bitancort.html", "Ricardo_Claudio_F._Garcia.html", "Ricardo_Da_Rocha.html", "Ricardo_Daniel_Altamirano.html", "Ricardo_Daniel_Klizemka.html", "Ricardo_Daniel_Kuzemka.html", "Ricardo_Enrique_Bochini.html", "Ricardo_Enrique_Bochini_2.html", "Ricardo_Gareca.html", "Ricardo_Giusti.html", "Ricardo_Gomes_Raimundo.html", "Ricardo_Horta.html", "Ricardo_Infante.html", "Ricardo_Javier_Perdomo.html", "Ricardo_Jorge_Freitas_Lopes.html", "Ricardo_Jorge_Iribarren.html", "Ricardo_José_Compiani.html", "Ricardo_Kuzemka.html", "Ricardo_Luis_del_Valle_Solbes.html", "Ricardo_Manuel_Nunes_Formosinho.html", "Ricardo_Miguel_Stasczuk.html", "Ricardo_Miguel_Teixeira_Aguiar.html", "Ricardo_Montenegro.html", "Ricardo_Nascimento.html", "Ricardo_Nicolas_Rentera.html", "Ricardo_Nicolás_Rentera.html", "Ricardo_Omar_Giusti.html", "Ricardo_Omar_Mattis.html", "Ricardo_Pages.html", "Ricardo_Pepi.html", "Ricardo_Rentera.html", "Ricardo_Roberto_Barreto_da_Rocha.html", "Ricardo_Rojas_Mendoza.html", "Ricardo_Salomon.html", "Ricardo_Sanabria.html", "Ricardo_Vicente_Canals.html", "Richard_A_Miliche.html", "Richard_Antonio_Albano.html", "Richard_Dutruel.html", "Richard_Friday.html", "Richard_Lecomte.html", "Richard_Owobokiri.html", "Richard_Silva.html", "Richard_Tavares.html", "Richard_Witschge.html", "Rigobert_Song.html", "Riku_Gunji.html", "Rio_Ferdinand.html", "Rio_Ngumoha.html", "Rivaldo.html", "Rivellino.html", "Rob_De_Wit.html", "Rob_Witschge.html", "Robert_Gerardo_Pua.html", "Robert_Lewandowski.html", "Robert_Paul_Destefano.html", "Robert_Pirès.html", "Robert_Sanchez.html", "Roberth_Patiño.html", "Roberto_Abbondancieri.html", "Roberto_Abbondanzieri.html", "Roberto_Acuña.html", "Roberto_Anibal_Passucci.html", "Roberto_Ariel_González.html", "Roberto_Baggio.html", "Roberto_Baía.html", "Roberto_Bonano.html", "Roberto_Brunetto.html", "Roberto_Cabanas.html", "Roberto_Cantoro.html", "Roberto_Cardozo.html", "Roberto_Carlos.html", "Roberto_Carlos_Abbondancieri.html", "Roberto_Carlos_Galarza.html", "Roberto_Carlos_Monserrat.html", "Roberto_Chery.html", "Roberto_Daniel_Iantorno.html", "Roberto_Darío_Gonzalez.html", "Roberto_Depietri.html", "Roberto_Fabián_Castellon.html", "Roberto_Gasparini.html", "Roberto_Gomez.html", "Roberto_Guizasola.html", "Roberto_Iacino.html", "Roberto_Jorge_Cerino.html", "Roberto_Jorge_Rodriguez.html", "Roberto_Krauseman.html", "Roberto_Lezcano.html", "Roberto_Luis_Medran.html", "Roberto_Luis_Oste.html", "Roberto_Luis_Oste_Jose_Antonio_Romero_Feris.html", "Roberto_Luis_Trotta.html", "Roberto_Medran.html", "Roberto_Mina.html", "Roberto_Mogrovejo.html", "Roberto_Molina.html", "Roberto_Monserrat.html", "Roberto_Moreira.html", "Roberto_Mussi.html", "Roberto_Oscar_Bonano.html", "Roberto_Oscar_Garcia.html", "Roberto_Oscar_Gómez.html", "Roberto_Palacios.html", "Roberto_Pasucci.html", "Roberto_Penaloza.html", "Roberto_Pompei.html", "Roberto_Rivellino.html", "Roberto_Rojas.html", "Roberto_Sanagua.html", "Roberto_Scaglione.html", "Roberto_Sosa.html", "Roberto_Viglione.html", "Roberto_Walter_Gargini.html", "Roberto_Walter_Mamani.html", "Robin_Huc.html", "Roby_Langers.html", "Rodolfo_Aquino.html", "Rodolfo_Arruabarrena.html", "Rodolfo_Esteban_Cardoso.html", "Rodolfo_Falero.html", "Rodolfo_Flores.html", "Rodolfo_G_Labrucherie.html", "Rodolfo_Graieb.html", "Rodolfo_Martín_Arruabarrena.html", "Rodolfo_Ramón_Garcia.html", "Rodolfo_Rodriguez.html", "Rodolfo_Sérgio_Rodríguez.html", "Rodolphe_Jegouzo.html", "Rodrigo_Betancur.html", "Rodrigo_Dourado.html", "Rodrigo_Fabio_Gambirassi.html", "Rodrigo_Freitas.html", "Rodrigo_Huescas.html", "Rodrigo_Llinas.html", "Rodrigo_Mendoza.html", "Rodrigo_Mora.html", "Rodrigo_Piloto.html", "Rodrigo_Riep.html", "Rodrigo_Sandivar.html", "Rodrigo_Vilariño.html", "Rogelio_Ramirez.html", "Rogelio_Roberto_Perrone.html", "Rogelio_Wilfrido_Delgado.html", "Roger_Boli.html", "Roger_Bou.html", "Roger_Gabriel_Morales.html", "Roger_Hitoto.html", "Roger_Mendy.html", "Roger_Menzy.html", "Roger_Milla.html", "Roger_Ricort.html", "Rogerio_Ceni.html", "Rogger_Morales.html", "Rogério_Manuel_P._Silva_Pimenta.html", "Rogério_Manuel_Silva_Jogaista.html", "Roland_Sallai.html", "Rolando_Carlos_Schiavi.html", "Rolando_Cristante.html", "Rolando_F._Mannarino.html", "Rolando_Fabián_González.html", "Rolando_Ramon_Barrera.html", "Rolão_Moreira_de_Novais.html", "Romain_Ferrier.html", "Roman_Ferber.html", "Roman_Kosecki.html", "Roman_Torres.html", "Romano_Postema.html", "Romarin_Billong.html", "Romario.html", "Romeo_Vermant.html", "Romulo_Cardoso.html", "Ronald_Koeman.html", "Ronald_Koeman1.html", "Ronaldinho_Gaucho.html", "Ronaldo.html", "Ronaldo_Damus.html", "Ronaldo_Nazario_1996_1997.html", "Ronaldo_Nazário.html", "Ronaldo_Pajaro.html", "Ronaldo_R9.html", "Ronan_Salaun.html", "Ronnie_Radford.html", "Roony_Bardghji.html", "Roque_Alfaro.html", "Roque_Caballero.html", "Roque_Erba.html", "Rosa.html", "Rossi_Bufalo.html", "Roy_A_Myers.html", "Royer_Caicedo.html", "Ruben_Alejandro_Tanucci.html", "Ruben_Dario_Ciraolo.html", "Ruben_Diez.html", "Ruben_Fernando_Da_Silva.html", "Ruben_Kluivert.html", "Ruben_Martin_Ruiz_Diaz.html", "Ruben_Orlando_Cordoba.html", "Ruben_Umpierrez.html", "Ruben_van_Bommel.html", "Rubens_Enrique_Navarro.html", "Rubens_Navarro.html", "Rubens_de_Jesus.html", "Rubick_da_Costa_Cunho.html", "Rubén_Ademar_Acosta.html", "Rubén_Adrián_Silva.html", "Rubén_Agüero.html", "Rubén_Alejandro_Bernuncio.html", "Rubén_Aníbal_Del_Olmo.html", "Rubén_Cantero.html", "Rubén_Capria_Labiste.html", "Rubén_Carro.html", "Rubén_Chavez.html", "Rubén_Ciraolo.html", "Rubén_Cousillas.html", "Rubén_Da_Silva_Echeverrito.html", "Rubén_Dario_Gomez.html", "Rubén_Dario_Insua.html", "Rubén_Darío_Delgado.html", "Rubén_Darío_Rivero.html", "Rubén_Darío_Rossi.html", "Rubén_F_Dos_Santos.html", "Rubén_Ferrer.html", "Rubén_Garate.html", "Rubén_Gomez.html", "Rubén_Horacio_Alzueta.html", "Rubén_Insua.html", "Rubén_José_Agüero.html", "Rubén_Manfredi.html", "Rubén_Mencia.html", "Rubén_Oscar_Capria.html", "Rubén_Osvaldo_Cousillas.html", "Rubén_Piaggio.html", "Rubén_Ramirez.html", "Rubén_Rodriguez.html", "Rubén_Rojas.html", "Rubén_Tanucci.html", "Rudi_Garcia.html", "Rudi_Voller.html", "Rudy_Marcel_Buidid.html", "Rudy_Matondo.html", "Rui_António_Cruz_Ferreira.html", "Rui_Barros_Soares-Gil.html", "Rui_Costa.html", "Rui_Duarte_Fernandes_Brás.html", "Rui_Fernando_Portela_Valentim.html", "Rui_Filipe_Tavares_Bastos.html", "Rui_Jorge_da_Costa_Rodrigues.html", "Rui_José_Capela_Batista.html", "Rui_José_Maside_Ribeiro.html", "Rui_Manuel_Dionísio_Correia.html", "Rui_Manuel_Lima_Correia_Palmares.html", "Rui_Manuel_Magalhães_Casado.html", "Rui_Manuel_Nendes_Crevejo.html", "Rui_Manuel_Pereira_Vieira.html", "Rui_Manuel_Quintal_Barbosa.html", "Rui_Manuel_Saúde_Soares.html", "Rui_Manuel_Trindade_Jordão.html", "Rui_Manuel_da_Silva_Correia.html", "Rui_Manuel_da_Silva_Ramos.html", "Rui_Manuel_de_Almeida_Santos.html", "Rui_Miguel_Leal_dos_Neves.html", "Rui_Pedro_Prata_Conceição_Gregório.html", "Rui_Pedro_Rodrigues_Eugénio.html", "Rui_dos_Santos_Carneiro_Neves.html", "Rushike_Kelson.html", "Ruslan_Mba.html", "Ruud-van_Nistelrooy.html", "Ruud_Gullit.html", "Ruud_Krol.html", "Ruud_van_Nistelrooy.html", "Ryan_Flamingo.html", "Ryan_Giggs.html", "Ryan_Gravenberch.html", "Ryszard_Tarasziewicz.html", "Réginald_Ray.html", "Régis_Brouard.html", "Régis_Castant.html", "Régis_Gorgues.html", "Régis_Le_Bris.html", "Rémi_Garde.html", "Rémy_Garde.html", "Rémy_Loret.html", "Rémy_Vogel.html", "Saar_M'Gor.html", "Saba_Kharebashvili.html", "Sabino_Mendes_Vieira_Saraiva.html", "Sabri_Lamouchi.html", "Sacha_Opinel.html", "Sacra.html", "Sadam_Masereka.html", "Sadio_Mane.html", "Safet_Susic.html", "Said_Bakari.html", "Said_El_Mala.html", "Salem_Harcheche.html", "Salimou_Danfakha.html", "Salis_Abdul_Samed.html", "Salomon_Rondon.html", "Salustiano_Fonte_da_Costa.html", "Salvador_Frega.html", "Salvador_Manriquez.html", "Sam_Beukema.html", "Sam_Junqua.html", "Sam_Kerr.html", "Sam_Kersten.html", "Samassi_Abou.html", "Samba_N'Diaye.html", "Sambou_Soumano.html", "Samir_Zamfir.html", "Sammy_Skytte.html", "Samson_Iyede.html", "Samuel_António_Silva_Torres_Goinar.html", "Samuel_Chukwueze.html", "Samuel_Etoo.html", "Samuel_Ipoua.html", "Samuel_Kuffour.html", "Samuel_Lobato.html", "Samuel_Lobato_Player_Card.html", "Samuel_Martinez.html", "Samuel_Mbangula.html", "Samuele_Ricci.html", "Sandor_Kocsis.html", "Sandra_Paños.html", "Sandro_Guzman.html", "Sandro_Mazzola.html", "Sandro_Ojeda.html", "Sandro_Vidigal.html", "Sanel_Saljic.html", "Santiago_Arias.html", "Santiago_Ascacibar.html", "Santiago_Ascacíbar.html", "Santiago_Canizares.html", "Santiago_Castro.html", "Santiago_Londoño.html", "Santiago_Londoño_Ruiz.html", "Santiago_Solari.html", "Sascha_Andreu.html", "Saud_Abdelhamid.html", "Sauveur_Aiello.html", "Saverio_Valente.html", "Saša_Peršon.html", "Scout_Assessment_Form.html", "Scouting_Intelligence_Report_Evan_Le_Gall.html", "Scouting_Intelligence_Report_Evan_Le_Gall_FR.html", "Sebastian_Abreu.html", "Sebastian_Berhalter.html", "Sebastian_Cordova.html", "Sebastian_Leto.html", "Sebastian_Villa.html", "Sebastián_Brusco.html", "Sebastián_Cavalli.html", "Sebastián_Juarez.html", "Sebastián_Mauro_Navarro.html", "Sebastián_Mendez.html", "Sebastián_Peña.html", "Sebastián_Rambert.html", "Sebastián_Raúl_Lencina.html", "Sebastián_Romero.html", "Segundo_Simon.html", "Sekou_Doucoure.html", "Selton_Sanchez.html", "Serafim_Neco_Zica.html", "Serge_Blanc.html", "Serge_Le_Dizet.html", "Serge_Recordier.html", "Serge_Romano.html", "Sergi_Enrich.html", "Sergino_Dest.html", "Sergio_Agüero.html", "Sergio_Albornoz.html", "Sergio_Alejandro_Niveyro.html", "Sergio_Alfonsin.html", "Sergio_Almiron.html", "Sergio_Angulo.html", "Sergio_Antonio_Saucedo.html", "Sergio_Arias.html", "Sergio_Arribas.html", "Sergio_Bady_Perez.html", "Sergio_Batista.html", "Sergio_Bernabé_Vargas.html", "Sergio_Berti.html", "Sergio_Buffarini.html", "Sergio_Busquets.html", "Sergio_Castillo.html", "Sergio_Catan.html", "Sergio_Cubero.html", "Sergio_Daniel_Batista.html", "Sergio_Daniel_Martínez.html", "Sergio_Daniel_Ozan.html", "Sergio_Daniel_Umpierrez.html", "Sergio_Daniel_Velasco.html", "Sergio_Darío_Supichatti.html", "Sergio_Diduch.html", "Sergio_Dopazo.html", "Sergio_Fabián_Vazquez.html", "Sergio_Fabián_Zarate.html", "Sergio_Faltracco.html", "Sergio_Fernandez.html", "Sergio_Fernando_Miguez.html", "Sergio_G_Fernandez_G.html", "Sergio_Garcia.html", "Sergio_Genaro.html", "Sergio_Goycochea.html", "Sergio_Gurrieri.html", "Sergio_Gustavo_Olivera.html", "Sergio_Hugo_Protti.html", "Sergio_Ivaldi.html", "Sergio_L_Caceres.html", "Sergio_Lara.html", "Sergio_Lerman.html", "Sergio_Lopez.html", "Sergio_Luis_Genaro.html", "Sergio_Mandrini.html", "Sergio_Marchi.html", "Sergio_Martinez.html", "Sergio_Martinez_Alzuri.html", "Sergio_Merlini.html", "Sergio_Oscar_Stachiotti.html", "Sergio_Otero.html", "Sergio_Panzardo.html", "Sergio_Perazzo.html", "Sergio_Perez.html", "Sergio_Priseajniuc.html", "Sergio_Protti.html", "Sergio_Ramos.html", "Sergio_Raul_Marchi.html", "Sergio_Rodriguez.html", "Sergio_Rosario_Maristan.html", "Sergio_Sanchez.html", "Sergio_Umpierrez_De_Mello.html", "Sergio_Vargas.html", "Sergio_Vazquez.html", "Sergio_Walter_Barbieri.html", "Sergio_Zanetti.html", "Sergio_Zarate.html", "Servando_Villamil.html", "Seydou_Dembele.html", "Shabani_Nonda.html", "Shane_Kluivert.html", "Sheu_Han.html", "Shuto_Machino.html", "Sidny_Cabral.html", "Silas_Andersen.html", "Silvano_F._Espindola.html", "Silvano_Maciel.html", "Silverio_Ramón_Penayo.html", "Silvino_Almeida_Lauro.html", "Silvio_Andrade.html", "Silvio_Azoge.html", "Silvio_Carrario.html", "Silvio_Constantino.html", "Silvio_Gabriel_Rudman.html", "Silvio_Mendoza.html", "Silvio_Paiva.html", "Silvio_Piola.html", "Simon_Adingra.html", "Simon_Falette.html", "Simon_Garcia.html", "Simone_Pafundi.html", "Siro_Darino.html", "Sivino_Pedro_L._de_Sousa_Morais.html", "Sixto_Peralta.html", "Socrates.html", "Sofian_Domoraud.html", "Sofyan_Amrabat.html", "Sofyane_Bouzamoucha.html", "Sohan_Baldoni.html", "Son_Heung_Min.html", "Sonny_Anderson.html", "Sonny_Silooy.html", "Sophia_Smith.html", "Souffian_El_Karouani.html", "Soufiane_Messeguem.html", "Soule_Sidibe.html", "Stabile.html", "Stanley_Matthews.html", "Stefan_Bajcetic.html", "Stefan_Posch.html", "Stephan_Lichtsteiner.html", "Stephan_Zagadou.html", "Stephane_Diarra.html", "Steve_Ambri.html", "Steve_Bloomer.html", "Steve_Mc_Manaman.html", "Steven_Berghuis.html", "Steven_Gerrard.html", "Steven_Ugarkovic.html", "Steven_Ugarković.html", "Stije_Resink.html", "Stiven_Valencia.html", "Stoyisho_Dimitrov_Mladenov.html", "Stéphan_Mazzolini.html", "Stéphan_Salomon.html", "Stéphane_Adam.html", "Stéphane_Blondeau.html", "Stéphane_Carnot.html", "Stéphane_Collet.html", "Stéphane_Demol.html", "Stéphane_Ferrand.html", "Stéphane_Fouillit.html", "Stéphane_Guivarc'h.html", "Stéphane_Guivarch.html", "Stéphane_Mahé.html", "Stéphane_Mazzolini.html", "Stéphane_Odet.html", "Stéphane_Osmond.html", "Stéphane_Paille.html", "Stéphane_Plancque.html", "Stéphane_Porato.html", "Stéphane_Pounewatchy.html", "Stéphane_Rivoal.html", "Stéphane_Roche.html", "Stéphane_Samson.html", "Stéphane_Santini.html", "Stéphane_Ziani.html", "Stéphane_d'Angelo.html", "Suleiman_Sani.html", "Sutalo.html", "Sven_Mijnans.html", "Sylvain_Bupto.html", "Sylvain_Deplace.html", "Sylvain_Flauto.html", "Sylvain_Kastendeuch.html", "Sylvain_Legwinski.html", "Sylvain_Matrisciano.html", "Sylvain_Poinçon.html", "Sylvain_Wiltord.html", "Szymon_Kadziolka.html", "Sébastien_Chabaud.html", "Sébastien_Dallet.html", "Sébastien_Le_Paih.html", "Sébastien_Pérez.html", "Sérgio_Henry_Valente_Cadorin.html", "Sérgio_Manuel_de_Freitas_Pedro.html", "Sérgio_Paulo_Gonçalves_Ribeiro.html", "Sérgio_dos_Santos_Duarte.html", "Tactical_Philosophies.html", "Tadeo_Allende.html", "Taribo_West.html", "Taylor.html", "Teddy_Alloh.html", "Teddy_Bertin.html", "Telasco_Segovia.html", "Teo_Barisic.html", "Teofilo_Cubillas.html", "Terry_Butcher.html", "Teófilo_Barrios.html", "Teófilo_Barrios_Garcia.html", "Theo_Mary.html", "Theo_Pahlpatz.html", "Theo_Planchon.html", "Therence_Koudou.html", "Thiago.html", "Thiago_Borbas.html", "Thiago_Leite.html", "Thibault_Courtois.html", "Thiebault_Vlietinck.html", "Thierart_Alain_Leon_Julien.html", "Thierno_Youm.html", "Thierry_Bonalair.html", "Thierry_Courault.html", "Thierry_Crétier.html", "Thierry_De_Neef.html", "Thierry_Fernier.html", "Thierry_Goudet.html", "Thierry_Gros.html", "Thierry_Henry.html", "Thierry_Laurey.html", "Thierry_Le_Blan.html", "Thierry_Le_Roux.html", "Thierry_Oleksiak.html", "Thierry_Pauk.html", "Thierry_Rabat.html", "Thierry_Rossi.html", "Thierry_Roumazeilles.html", "Thierry_Taberner.html", "Thierry_Uvenard.html", "Thomas_Allofs.html", "Thomas_De_Martis.html", "Thomas_Delaney.html", "Thomas_Deniaud.html", "Thomas_Fernandez.html", "Thomas_Jørgensen.html", "Thomas_Kokkinis.html", "Thorgan_Hazard.html", "Tiago_Augusto.html", "Tiago_Palacios.html", "Tidiane_Devernois.html", "Tijjani_Reijnders.html", "Tim_Littmann.html", "Tim_Littmann_Complete_Intelligence_Dossier.html", "Timo_Werner.html", "Titi_Camara.html", "Titouan_Thomas.html", "Tomas_Carlovich.html", "Tomas_Marques.html", "Tomas_Molina.html", "Tomas_Palacios.html", "Tomasz_Frankowski.html", "Toni_Fernandez.html", "Toni_Kroos.html", "Tony_Dupont.html", "Tony_Gomez_Gomez.html", "Tony_Heurtebis.html", "Tony_Kurbos.html", "Tony_Lesueur.html", "Tony_Vairelles.html", "Tordoya.html", "Tostao.html", "Tostão.html", "Toufik_Hachadi.html", "Toulouse_FC.html", "Trent_Alexander_Arnold.html", "Tresor_Mputu.html", "Tressor_Moreno.html", "Tristan_Blackmon.html", "Troy_Parrott.html", "Tsuyoshi_Watanabe.html", "Tueba_Menzane.html", "Tvezan_Volev_Dakov.html", "Tyrique_George.html", "Tziolis.html", "Ubaldo_Daniel_Mareco.html", "Ubaldo_Matildo_Fillol.html", "Ubiraci_Sousa_de_Souza.html", "Ulrich_Le_Pen.html", "Umechi_Akuazaoku.html", "Uriel_Bartolucci.html", "Urlin_Canga.html", "Uros_Racic.html", "Uwe_Kamps.html", "Uwe_Seeler.html", "Vagiz_Khidiatouline.html", "Valdir_Oliveira.html", "Valdo_Cândido_Filho.html", "Valdovinos.html", "Valentin_Antov.html", "Valérien_Ismaël.html", "Valério_Jorge_Moreira_Pereira.html", "Vangelis_Pavlidis.html", "Vanja_Grubač.html", "Vasco_da_Silva_Braga.html", "Vasconcelos.html", "Vasilije_Adžić.html", "Vassilis_Hatzipanagis.html", "Vata_Mataca_Garcia.html", "Velko_Iotov.html", "Venancio_Ariel_Ramos.html", "Venancio_Ramos.html", "Venuste_Baboula.html", "Vicente_Fangueiro_Pereira.html", "Vicente_Guaita.html", "Vicente_Valor.html", "Victor_Aristizabal.html", "Victor_Boniface.html", "Victor_Bonilla.html", "Victor_Da_Silva.html", "Victor_Eletu.html", "Victor_Eletu_Complete_Intelligence_Dossier.html", "Victor_Hugo_Civarelli.html", "Victor_Hugo_Ferreyra.html", "Victor_Hugo_Marchesini.html", "Victor_Ibarbo.html", "Victor_Ikpeba.html", "Victor_Osimhen.html", "Victor_Ozhianvuna.html", "Victor_Pedreiro.html", "Victor_Sotomayor.html", "Victor_Wolheim.html", "Victor_Zeoula.html", "Vidal_Pachito.html", "Vidor_Manuel_Leões_dos_Santos.html", "Vikash_Dhorasoo.html", "Vincent_Bracigliano.html", "Vincent_Candela.html", "Vincent_Chickaro.html", "Vincent_Cobos.html", "Vincent_Guerin.html", "Vincent_Petit.html", "Vincent_Sattler.html", "Vincenzo_Scifo.html", "Vinicius_Jr.html", "Vinith_Venkatesh.html", "Vinnie_Jones.html", "Vinícius_Lopes_Righi.html", "Virgílio_Manuel_Bagulho_Lopes.html", "Vitaly_Janelt.html", "Vitor_Hugo.html", "Vivaldo_de_Jesus_S._Palma_Vargas.html", "Vladimir_Gudelj.html", "Vladimir_Marin.html", "Volkan_Babacan.html", "Vuk_Bogdanovic.html", "Víctor_A_Silva.html", "Víctor_Andrada.html", "Víctor_Ayala.html", "Víctor_Bottaniz.html", "Víctor_Civarelli.html", "Víctor_Damiano.html", "Víctor_Daniel_Fernandez.html", "Víctor_Delgado.html", "Víctor_Heredia.html", "Víctor_Hugo_Bratin.html", "Víctor_Hugo_Heredia.html", "Víctor_Hugo_Rodriguez.html", "Víctor_Jimenez.html", "Víctor_Lopez_Narge.html", "Víctor_Lorenzon.html", "Víctor_Lucero.html", "Víctor_M_Centurion.html", "Víctor_Manuel_Lopez.html", "Víctor_Manuel_Rabuñal.html", "Víctor_Marchesini.html", "Víctor_Molina.html", "Víctor_Muller.html", "Víctor_Rueda.html", "Víctor_Sanchez.html", "Víctor_Sotomayor.html", "Vítor_Ferreyra.html", "Vítor_Manuel_Afonso_Damas_de_Oliveira.html", "Vítor_Manuel_Antão_Ribeiro.html", "Vítor_Manuel_Costa_Araújo.html", "Vítor_Manuel_Fernandes_dos_Santos.html", "Vítor_Manuel_Martins_Baía.html", "Vítor_Manuel_Morais_Teixeira_Pereira.html", "Vítor_Manuel_Tavares_Vasconcelos.html", "Vítor_Manuel_da_Graça_Madeira.html", "Vítor_de_Jesus_Calderón.html", "Waldemar_Matysik.html", "Walid_Abdelali.html", "Walter_Aldo_Capozucchi.html", "Walter_Bello.html", "Walter_Beron.html", "Walter_Caceres.html", "Walter_Capozucchi.html", "Walter_Coyette.html", "Walter_Del_Rio.html", "Walter_Erviti.html", "Walter_Fiori.html", "Walter_Fiori_Sportivo_Italiano.html", "Walter_Gabriel_Rojas.html", "Walter_Hector_Pajon.html", "Walter_Javier_Fernandez.html", "Walter_Javier_Paz.html", "Walter_José_Del_Río.html", "Walter_Lemma.html", "Walter_Lopez.html", "Walter_Luis_Pelletti.html", "Walter_Lujan.html", "Walter_Machado_da_S._Filho.html", "Walter_Marcelo_Baez.html", "Walter_Mari_Gauto.html", "Walter_Montillo.html", "Walter_Nicolás_Otta.html", "Walter_Olivera.html", "Walter_Omar_Fiori.html", "Walter_Oscar_Lozano.html", "Walter_Osmar_Arzamendia.html", "Walter_Osvaldo_Perazzo.html", "Walter_Parodi.html", "Walter_Pelletti_Vezzoso.html", "Walter_Perazzo.html", "Walter_Ramon_Bello.html", "Walter_Reinaldo_Pico.html", "Walter_René_Fernandez.html", "Walter_Silvani.html", "Walter_Varela_Martinez.html", "Walter_Viqueira.html", "Wanda_Nara.html", "Washington_Abreu_Gallo.html", "Washington_G_Fagundez.html", "Washington_Gonzalez.html", "Washington_Raúl_Perez.html", "Washington_Rodriguez.html", "Washington_Sebastian_Abreu.html", "Wayne_Rooney.html", "Wei_Xiangxin.html", "Wellington_Valdez.html", "Wendie_Renard.html", "Wessel_Dammers.html", "Wijndal.html", "Wilbert_Suvrijn.html", "Wilder_Viera_Empire_FGA_Profile.html", "Wilfred_Agbonavbare.html", "Wilfried_Bertrand.html", "Wilfried_Gohel.html", "Will_Seymore.html", "Willem_Kieft.html", "William_Amaral_de_Andrade.html", "William_Araújo_Neves.html", "William_Ayache.html", "William_Castro.html", "William_Douglas_Humia_Menezes.html", "William_Njo-Léa.html", "William_Prunier.html", "Willington_Ortiz.html", "Willy_Sagnol.html", "Wilson_Nuñez.html", "Wilson_Oruma.html", "Wisdom_Mike.html", "Wissam_Slama.html", "World_Cup_1994.html", "Wouter_Goes.html", "Wálter_Bruttinel.html", "Wálter_Roberto_Gomez.html", "Xabi_Alonso.html", "Xabier_Azkargorta.html", "Xaver_Schlager.html", "Xavi_Hernandez.html", "Xavi_Simons.html", "Xavier_Balladares.html", "Xavier_Gravelaine.html", "Xavier_Rhinan.html", "Xhordan_Lajthia.html", "Yacouba_Maiga.html", "Yacqub_Finey.html", "Yago_Cantero.html", "Yamil_Sibona.html", "Yan_Diomande.html", "Yan_Sasse.html", "Yann_Aurel_Bisseck.html", "Yann_Bodiger.html", "Yann_Kitala.html", "Yann_Lachuer.html", "Yann_Synaeghel.html", "Yannick_Adjoumani.html", "Yannick_Baret.html", "Yannick_Chandioux.html", "Yannick_Fischer.html", "Yannick_Guillochon.html", "Yannick_Rott.html", "Yannick_Stopyra.html", "Yannick_Woudstra.html", "Yannis_Nahounou.html", "Yarek_Gasiorowski.html", "Yari_Verschaeren.html", "Yaser_Asprilla.html", "Yassine_Gourari_Tebaa.html", "Yaya_Toure.html", "Yenerey_Betancor.html", "Yllan_Okou.html", "Yoan_Wissa.html", "Yoann_Beaka.html", "Youcef_Belaili.html", "Younes_Hansal.html", "Youness_Lachhab.html", "Youri_Baas.html", "Youri_Djorkaeff.html", "Youri_Regeer.html", "Youssef_En_Nesyri.html", "Youssef_Salimi.html", "Youssouf_Fofana.html", "Youssoufa_Moukoko.html", "Yuber_Quinones.html", "Yuber_Quiñones.html", "Yunus_Azrak.html", "Yunus_Musah.html", "Yvan_Lebourgeois.html", "Yvann_Titi.html", "Yves_Frangini.html", "Yves_Laffet.html", "Yves_Mangione.html", "Yves_Pouliquen.html", "Yvon_Le_Roux.html", "Yvon_Pouliquen.html", "Yúbert_Lemos.html", "Zahana_Haouari.html", "Zakaria_Eddahchouri.html", "Zakaria_El_Ouahdi.html", "Zbigniew_Boniek.html", "Zbigniew_Kaczmarek.html", "Zeno_Debast.html", "Zeno_Van_den_Bosch.html", "Zico.html", "Zidane_Bedoya.html", "Zie-Mohamed_Ouattara.html", "Zinedine_Zidane.html", "Zizinho.html", "Zlatan_Ibrahimovic.html", "Zlatko_Vujovic.html", "Zola_Matumona.html", "Zoran_Vujovic.html", "adam_taggart.html", "adrien-perez-profile.html", "agwa_obiech.html", "aissa_saidane.html", "alexander-stjernegaard-profile.html", "arne-engels-profile.html", "bart-verbruggen-profile.html", "bradley-sample-profile.html", "brandsen_sports_dashboard.html", "brenden-aaronson-profile.html", "carlo-ancelotti-coach-profile.html", "carlos-ischia-coach-profile.html", "client_login.html", "cristian-medina-profile.html", "daniel-carvajal-profile.html", "daniel-steres-profile.html", "david-weir-coach-NEW.html", "david-weir-coach-profile.html", "david-weir-player-profile.html", "dereck-waldeck-profile.html", "diego-da-silva-profile.html", "diego-simeone-coach-profile.html", "ederson-profile.html", "edwuin-cetre-profile.html", "emilio-ycaza-profile.html", "emmanuel_gyasi_dashboard.html", "empire_fga_hybrid_platform.html", "esn_product_brief.html", "ezequiel-piovi-profile.html", "fernando-muslera-profile.html", "filipe-luis-coach-profile.html", "gustavo_bartelt.html", "iker-casillas-profile.html", "index.html", "johnny-rodriguez-profile.html", "jorge-fossati-coach-profile.html", "jose-sosa-profile.html", "login.html", "luke-biasi-profile.html", "marcelo-saralegui-profile.html", "mario-saralegui-profile.html", "martin-zubimendi-profile.html", "mikel-amondarain-profile.html", "mohamed-ouadah-profile.html", "nelson-acosta-coach-profile.html", "ngolo-kante-profile.html", "nicolas-benedetti-profile.html", "panagiotis-tsivikos-profile.html", "patrik-mercado-profile.html", "pep-guardiola-manager-profile.html", "pep-guardiola-player-profile.html", "pierluigi-collina-profile.html", "pitshou_muteba_dashboard.html", "platform.html", "platform_PRE_ARG_BIO_BACKUP.html", "platform_PRE_BRASIL_REFRESH_BACKUP.html", "platform_PRE_ECUFIX_BACKUP.html", "platform_PRE_EXTRA_METRICS_BACKUP.html", "platform_PRE_HIERDASH_BACKUP.html", "platform_PRE_IRANROU_BACKUP.html", "platform_PRE_LEGEND_PLAYERS_BACKUP.html", "platform_PRE_PROFILE_UI_FIX_BACKUP.html", "platform_PRE_PTFR1988_BACKUP.html", "platform_UPDATED.html", "platform_es.html", "platform_es_CORRUPTED_TIMEOUT_BACKUP.html", "platform_es_PRE_ARG_BIO_BACKUP.html", "platform_es_PRE_BRASIL_REFRESH_BACKUP.html", "platform_es_PRE_ECUFIX_BACKUP.html", "platform_es_PRE_EXTRA_METRICS_BACKUP.html", "platform_es_PRE_HIERDASH_BACKUP.html", "platform_es_PRE_IRANROU_BACKUP.html", "platform_es_PRE_LEGEND_PLAYERS_BACKUP.html", "platform_es_PRE_PROFILE_UI_FIX_BACKUP.html", "platform_es_PRE_PTFR1988_BACKUP.html", "platform_gallardo_ES.html", "platform_m.html", "platform_m_es.html", "platform_tanner.html", "players.html", "players_PRE_DIRECTORY_FIX_BACKUP.html", "players_PRE_FULL_DIRECTORY_FIX_BACKUP.html", "players_PRE_PTFR1988_BACKUP.html", "sam-junqua-profile.html", "santiago-ascacibar-profile.html", "sir-alex-ferguson-profile.html", "test.html", "tiago-palacios-profile.html", "van_Basten.html", "vicente-del-bosque-profile.html", "viera.html", "willis-furtado-profile.html", "willy-pretel-profile.html", "Álvaro_Cardoso_Teixeira.html", "Álvaro_Manuel_Soares_Pereira.html", "Álvaro_Nordeiro_Magalhães.html", "Álvaro_Nordeiro_de_Freitas.html", "Ángel_Hoyos.html", "Ângelo_Fernando_Conceição_Santos.html", "Éric_Decroix.html", "Éric_Durand.html", "Éric_Loussouarn.html", "Éric_Roy.html", "Đorđe_Tomić.html", "Ľubomír_Moravčík.html", "Dion_Drena_Beljo.html", "Rayan_Lafdil.html", "Younes_Belkacemi.html"]);
const CLUBS={
  "Liga AUF": ["Albion FC", "Bella Vista", "Boston River", "Central Español", "Cerro", "Cerro Largo", "Danubio", "Defensor", "Defensor Sporting", "Juventud–LP", "Liverpool", "Maldonado", "Montevideo Wanderers", "Nacional", "Peñarol", "Progreso", "Racing", "Racing–Mvdeo", "Rentistas", "River–Mvdeo", "Torque", "Wanderers"],
  "Bundesliga 2": ["Arminia", "BTSV", "Bochum", "Darmstadt 98", "Dresden", "Düsseldorf", "Elversberg", "Greuther Fürth", "Hannover 96", "Hertha BSC", "Holstein Kiel", "Kaiserslautern", "Karlsruher", "Magdeburg", "Nürnberg", "Paderborn 07", "Preußen Münster", "Schalke 04"],
  "Primera B Nacional": ["Atlético Campana", "Central Ballester", "José Antonio Romero Feris", "Sportivo Italiano", "Unión (Santa Fe)"],
  "Kazakhstan Premier League": ["Kairat Almaty"],
  "La Liga": ["Alavés", "Athletic Club", "Atlético Madrid", "Barcelona", "Celta Vigo", "Elche", "Espanyol", "Getafe", "Girona", "Levante", "Mallorca", "Osasuna", "Oviedo", "Rayo Vallecano", "Real Betis", "Real Madrid", "Real Sociedad", "Sevilla", "Valencia", "Villarreal"],

  "Premier League": ["Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Burnley", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Leeds United", "Liverpool", "Manchester City", "Manchester Utd", "Newcastle", "Nottingham", "Sunderland", "Tottenham", "West Ham", "Wolves"],
"Brasileirão Série A": ["Athletico–PR", "Atlético Mineiro", "Bahia", "Botafogo–RJ", "Chapecoense", "Corinthians", "Coritiba", "Cruzeiro", "Flamengo", "Fluminense", "Grêmio", "Internacional", "Mirassol", "Palmeiras", "RB Bragantino", "Remo", "Santos", "São Paulo", "Vasco da Gama", "Vitória"], "Liga Portugal 2": ["Académico Viseu FC", "CD Feirense", "CD Tondela", "CS Marítimo", "FC Felgueiras 1932", "FC Paços de Ferreira", "FC Penafiel", "FC Porto B", "FC Vizela", "GD Chaves", "Leixões SC", "Lusitânia FC Lourosa", "Portimonense SAD", "SC Farense", "SC União Torreense", "SL Benfica B", "Sporting CP B", "UD Leiria", "UD Oliveirense"], "A-League": ["Adelaide United", "Auckland FC", "Brisbane", "Central Coast", "Macarthur FC", "Melb City", "Melb. Victory", "Newcastle Jets", "Perth Glory", "Sydney FC", "Wellington", "Western Sydney"], "BGL Ligue": ["Atert Bissen", "Differdange 03", "Mondorf-les-Bains", "UNA Strassen", "F91 Dudelange", "Jeunesse Esch", "Racing Union", "Käerjeng 97", "Hostert", "Victoria Rosport", "Progrès Niederkorn", "Swift Hesperange", "Jeunesse Canach", "Mamer 32", "Union Titus Pétange", "Rodange"], "NB I": ["Debrecen", "Diósgyőr", "Ferencváros", "Győr", "Kazincbarcikai", "Kisvárda", "MTK Budapest", "Nyíregyháza", "Paks", "Puskás Akad.", "Zalaegerszeg", "Újpest"], "Andorra Primera Divisió": ["Atlètic Club d'Escaldes", "Carroi", "Esperança", "FC Ordino", "FC Santa Coloma", "Inter Club d'Escaldes", "Penya Encarnada", "Rànger's FC", "UE Santa Coloma"], "Serie A": ["Atalanta", "Bologna", "Cagliari", "Como", "Cremonese", "Fiorentina", "Genoa", "Hellas Verona", "Inter", "Juventus", "Lazio", "Lecce", "Milan", "Napoli", "Parma", "Pisa", "Roma", "Sassuolo", "Torino", "Udinese"], "Jupiler Pro League": ["Anderlecht", "Antwerp", "Cercle Brugge", "Charleroi", "Club Brugge", "Dender", "Genk", "Gent", "La Louvière", "Mechelen", "OH Leuven", "Sint-Truiden", "Standard Liège", "Union SG", "Westerlo", "Zulte Waregem"], "Eredivisie": ["AZ Alkmaar", "Ajax", "Excelsior", "Feyenoord", "Fortuna Sittard", "Go Ahead Eagles", "Groningen", "Heerenveen", "Heracles Almelo", "NAC Breda", "NEC Nijmegen", "PSV", "Sparta Rotterdam", "Telstar", "Twente", "Utrecht", "Volendam", "Zwolle"], "Danish Superliga": ["AGF", "Brøndby", "FC Copenhagen", "FC Fredericia", "Midtjylland", "Nordsjælland", "Odense", "Randers", "Silkeborg", "SønderjyskE", "Vejle BK", "Viborg"], "MLS": ["Atlanta Utd", "Austin FC", "CF Montréal", "Charlotte", "Chicago Fire", "Colorado Rapids", "Columbus Crew", "D.C. United", "FC Cincinnati", "FC Dallas", "Houston Dynamo", "Inter Miami", "LA Galaxy", "LAFC", "Minnesota Utd", "NE Revolution", "NY Red Bulls", "NYCFC", "Nashville SC", "Orlando City", "Philadelphia Union", "Portland Timbers", "Real Salt Lake", "SJ Earthquakes", "San Diego FC", "Seattle Sounders", "Sporting KC", "St. Louis City", "Toronto FC", "Vancouver W'caps"], "Primera División": ["Aldosivi", "Arg Juniors", "Argentinos Juniors", "Atlé Tucumán", "Banfield", "Barracas Central", "Belgrano", "Belgrano de Córdoba", "Boca Juniors", "C. Córdoba–SdE", "CA San Lorenzo", "Cen. CórdobaSdE", "Chaco For Ever", "Club Atlético Español", "Colón", "Defensa", "Defensa y Justicia", "Dep. Riestra", "Deportivo Español", "Deportivo Italiano", "Deportivo Riestra", "Estudiantes (La Plata)", "Estudiantes de La Plata", "EstudiantesLP", "Estudiantes–LP", "Estudiantes–RC", "Ferro Carril Oeste", "Gimnasia y Esgrima (La Plata)", "Gimnasia y Esgrima La Plata", "Gimnasia y Tiro (Jujuy)", "GimnasiaLP", "Gimnasia–Jujuy", "Gimnasia–LP", "Gimnasia–M", "Godoy Cruz", "Huracán", "Huracán–Ctes", "Ind. Rivadavia", "Independiente", "Instituto", "Instituto (Cordoba)", "Lanús", "Mandiyú (Corrientes)", "Newell's", "Newell's Old Boys", "Platense", "Racing (Cordoba)", "Racing Club", "Racing–Cba", "River Plate", "Rosario Central", "San Lorenzo", "San Lorenzo de Almagro", "San MartínSJ", "SarmientoJ", "Sarmiento–J", "Talleres (Córdoba)", "TalleresC", "Talleres–C", "Temperley", "Tigre", "Unión", "Unión (Santa Fe)", "Unión Santa Fe", "Vélez Sarsfield"], "Primeira Liga": ["Académica", "Académico de Viseu", "Alverca", "Arouca", "AVS Futebol", "Beira-Mar", "Belenenses", "Benfica", "Boavista", "Braga", "Campomaiorense", "Casa Pia", "Chaves", "Estoril", "Estrela", "Estrela da Amadora", "Famalicão", "Farense", "FC Porto", "Gil Vicente FC", "Leixões", "Leça", "Marítimo", "Moreirense", "Nacional", "Nacional (Madeira)", "Penafiel", "Portimonense", "Porto", "Rio Ave", "Salgueiros", "Santa Clara", "Sp. Braga", "Sp. Espinho", "Sporting", "Sporting CP", "Tondela", "V. Guimarães", "V. Setúbal", "Varzim", "Vitória Guimarães"], "Süper Lig": ["Alanyaspor", "Antalyaspor", "Başakşehir", "Beşiktaş", "Eyüpspor", "Fatih Karagümrük", "Fenerbahçe", "Galatasaray", "Gaziantep FK", "Gençlerbirliği", "Göztepe", "Kasımpaşa", "Kayserispor", "Kocaelispor", "Konyaspor", "Rizespor", "Samsunspor", "Trabzonspor"], "USL Championship": ["B'ham Legion", "Brooklyn FC", "CS Switchbacks", "Charleston", "Detroit City", "El Paso", "FC Tulsa", "Hartford Athletic", "Indy Eleven", "LV Lights FC", "Lexington SC", "Loudoun United", "Louisville City", "Miami FC", "Monterey Bay", "New Mexico Utd", "Oakland Roots", "Orange County", "Phoenix Rising", "Pittsburgh", "Rhode Island FC", "Sac Republic", "San Antonio FC", "Sporting JAX", "TB Rowdies"], "Liga 1 Perú": ["ADT", "Alianza Atlético", "Alianza Lima", "Atlético Grau", "CD Garcilaso", "CD Moquegua", "Cajamarca", "Cienciano", "Comerciantes", "Cusco", "Juan Pablo II", "Los Chankas", "Melgar", "Sport Boys", "Sport Huancayo", "Sporting Cristal", "UTC", "Universitario"], "Primera A": ["Alianza Petrolera", "América Cali", "Atlético Nacional", "Boyacá Chicó", "Bucaramanga", "Cúcuta", "Deportes Tolima", "Deportivo Cali", "Deportivo Pasto", "Fortaleza FC", "Ind. Medellín", "Jaguares", "Junior", "La Equidad", "Llaneros", "Millonarios", "Once Caldas", "Pereira", "Santa Fe", "Águilas Doradas"], "Primera B": ["Barranquilla FC", "Bogotá FC", "Deportes Quindío", "Envigado FC", "Internacional de Palmira", "Real Cartagena", "Tigres FC", "Unión Magdalena"], "Austrian Bundesliga": ["Austria Wien", "Blau-Weiß Linz", "Grazer AK", "Hartberg", "LASK", "RB Salzburg", "RZ Pellets WAC", "Rapid Wien", "Rheindorf Altach", "Ried", "Sturm Graz", "WSG Tirol"], "Keuken Kampioen Divisie": ["ADO Den Haag", "Almere City", "Cambuur", "De Graafschap", "Den Bosch", "Dordrecht", "Emmen", "FC Eindhoven", "Helmond Sport", "Jong AZ", "Jong Ajax", "Jong PSV", "Jong Utrecht", "MVV Maastricht", "Oss", "RKC Waalwijk", "Roda JC", "VVV-Venlo", "Vitesse", "Willem II"], "Swiss Super League": ["Basel", "FC Winterthur", "Grasshopper", "Lausanne-Sport", "Lugano", "Luzern", "Servette FC", "Sion", "St. Gallen", "Thun", "Young Boys", "Zürich"], "Eliteserien": ["Aalesund", "Bodø/Glimt", "Brann", "Fredrikstad", "HamKam", "KFUM Oslo", "Kristiansund", "Lillestrøm", "Molde", "Rosenborg", "Sandefjord", "Sarpsborg 08", "Start", "Tromsø", "Viking", "Vålerenga"], "División Profesional": ["ABB", "Always Ready", "Aurora", "Blooming", "Bolívar", "FC Universitario", "GV San José", "Guabirá", "Indep Petrolero", "Nacional Potosí", "Oriente Petrolero", "Real Oruro", "Real Potosí", "Real Tomayapo", "S.A. Bulo Bulo", "The Strongest"], "Ligue 1": ["Angers", "Auxerre", "Bordeaux", "Brest", "Caen", "Cannes", "Laval", "Le Havre", "Lens", "Lille", "Lorient", "Lyon", "Marseille", "Metz", "Monaco", "Montpellier", "Nancy", "Nantes", "Nice", "PSG", "Paris FC", "Paris Saint-Germain", "Rennes", "Saint-Étienne", "Sochaux", "Strasbourg", "Toulon", "Toulouse"],
  "Bundesliga": ["Augsburg", "Bayern Munich", "Dortmund", "Frankfurt", "Freiburg", "Gladbach", "Hamburger SV", "Heidenheim", "Hoffenheim", "Köln", "Leverkusen", "Mainz 05", "RB Leipzig", "St Pauli", "Stuttgart", "Union Berlin", "Werder Bremen", "Wolfsburg"],
  "Championship": ["Birmingham City", "Blackburn", "Bristol City", "Charlton Athletic", "Coventry City", "Derby County", "Hull City", "Ipswich Town", "Leicester City", "Middlesbrough", "Millwall", "Norwich City", "Oxford United", "Portsmouth", "Preston", "QPR", "Sheffield United", "Sheffield Weds", "Southampton", "Stoke City", "Swansea City", "Watford", "West Brom", "Wrexham"],
  "Liga MX": ["América", "Atlas", "Atlético San Luis", "Cruz Azul", "FC Juárez", "Guadalajara", "León", "Mazatlán", "Monterrey", "Necaxa", "Pachuca", "Puebla", "Querétaro", "Santos Laguna", "Tijuana", "Toluca", "UANL", "UNAM"],
  "Scottish Premiership": ["Aberdeen", "Celtic", "Dundee", "Dundee United", "Falkirk", "Hearts", "Hibernian", "Kilmarnock", "Livingston", "Motherwell", "Rangers", "St Mirren"],
  "Saudi Pro League": ["Al-Ahli", "Al-Ettifaq", "Al-Fateh", "Al-Fayha", "Al-Hazem", "Al-Hilal", "Al-Ittihad", "Al-Khaleej", "Al-Kholood", "Al-Najma", "Al-Nassr", "Al-Okhdood", "Al-Qadsiah", "Al-Riyadh", "Al-Shabab", "Al-Taawoun", "Damac", "Neom"],
  "La Liga 2": ["Albacete", "Almería", "Burgos", "Castellón", "Ceuta", "Cultural Leonesa", "Cádiz", "Córdoba", "Dep. La Coruña", "Eibar", "FC Andorra", "Granada", "Huesca", "Las Palmas", "Leganés", "Mirandés", "Málaga", "Racing Sant", "Real Sociedad B", "Sporting Gijón", "Valladolid", "Zaragoza"],
  "USL League One": ["AC Boise", "AV Alta FC", "Charlotte", "Corpus Christi", "FC Naples", "Fort Wayne FC", "Fwd Madison", "Greenville", "Hearts of Pine", "NY Cosmos", "One Knoxville", "Red Wolves", "Richmond", "Sarasota", "Spokane", "Union Omaha", "Westchester SC"],
  "Super League Greece": ["AEK Athens", "AEL Larissa", "Apollon Smyrnis", "Aris", "Asteras Tripolis", "Atromitos", "Ionikos", "Kifisia", "Levadiakos", "OFI Crete", "Olympiacos", "PAOK", "PAS Giannina", "PAS Lamia", "Panathinaikos", "Panetolikos", "Panserraikos", "Volos NFC"],
};
const MGRS = ["Bearzot", "Beckenbauer", "Beenhakker", "Bielsa", "Bilardo", "Busby", "Carniglia", "Cesarini", "Clough", "Conte", "Cramer", "Cruyff", "Czeizler", "DeVisser", "Deschamps", "Emery", "Ferguson", "Flick", "Fontaine", "Goethals", "Guardiola", "Happel", "Herrera", "Heynckes", "Hiddink", "Hitzfeld", "Klopp", "Kovacs", "Liedholm", "Lippi", "Lobanovskyi", "Menotti", "Michels", "Milutinovic", "Mourinho", "Munoz", "Nagelsmann", "Osim", "Penev", "Petru", "Platini", "Pochettino", "Ranieri", "Robson", "Rocco", "Sacchi", "Santana", "Shankly", "Simeone", "Suaudeau", "Trapattoni", "Tuchel", "VanGaal", "Venables", "Wenger", "Zagallo"];
const SCHS = ["South American School", "English School", "German School", "Italian School", "Global Masters", "Dutch School", "Spanish School", "French School", "Eastern European School", "Scouting Revolution", "Belgian School", "Hungarian School", "Scandinavian Masters", "Modern Masters"];
const LC   = {"Jupiler Pro League": 322, "Eredivisie": 517, "Danish Superliga": 276, "MLS": 850, "Primera División": 866, "Primeira Liga": 374, "Süper Lig": 456, "Serie A": 610, "Andorra Primera Divisió": 136, "NB I": 412, "BGL Ligue": 25, "A-League": 368, "Liga Portugal 2": 66, "USL Championship": 603, "Liga 1 Perú": 466, "Primera A": 458, "Primera B": 40, "Austrian Bundesliga": 344, "Keuken Kampioen Divisie": 499, "Swiss Super League": 387, "Eliteserien": 420};
const PC   = {"FW": 1942, "MF": 4282, "DF": 3256, "GK": 761};
const AG   = {"U21": 2221, "21-25": 2574, "26-30": 2348, "31-35": 1096, "35+": 206};
const FB   = {"80-100": 39, "60-80": 834, "40-60": 780, "20-40": 1381, "0-20": 628, "PENDING": 4833};
const SD   = [{"n": "Argentine School", "c": 1108}, {"n": "Italian School", "c": 483}, {"n": "English School", "c": 474}, {"n": "German School", "c": 387}, {"n": "Dutch School", "c": 309}, {"n": "Global Masters", "c": 206}, {"n": "Spanish School", "c": 161}, {"n": "Brazilian School", "c": 119}, {"n": "French School", "c": 107}, {"n": "Scandinavian Masters", "c": 49}, {"n": "Modern Masters", "c": 45}, {"n": "Eastern European", "c": 44}, {"n": "Belgian Masters", "c": 41}, {"n": "Eastern European School", "c": 39}, {"n": "Scouting Revolution", "c": 37}, {"n": "Hungarian School", "c": 25}, {"n": "Belgian School", "c": 19}, {"n": "Scandinavian", "c": 8}];

const LM = {
  'MLS':{flag:'🇺🇸',sh:'MLS',col:'#E01C24'},
  'Primera División':{flag:'🇦🇷',sh:'ARG',col:'#74ACDF'},
  'Eredivisie':{flag:'🇳🇱',sh:'NED',col:'#FF7100'},
  'Jupiler Pro League':{flag:'🇧🇪',sh:'BEL',col:'#FAE042'},
  'Danish Superliga':{flag:'🇩🇰',sh:'DEN',col:'#C60C30'},
  'USL Championship':{flag:'🇺🇸',sh:'USL',col:'#A0C4E0'},
  'Primeira Liga':{flag:'🇵🇹',sh:'POR',col:'#006600'},
  'Süper Lig':{flag:'🇹🇷',sh:'TUR',col:'#E8003D'},
  'Serie A':{flag:'🇮🇹',sh:'ITA',col:'#0066CC'},
  'Andorra Primera Divisió':{flag:'🇦🇩',sh:'AND',col:'#FFB81C'},
  'NB I':{flag:'🇭🇺',sh:'HUN',col:'#8B2131'},
  'BGL Ligue':{flag:'🇱🇺',sh:'LUX',col:'#00A651'},
  'A-League':{flag:'🇦🇺',sh:'AUS',col:'#FFD700'},
  'Liga Portugal 2':{flag:'🇵🇹',sh:'POR2',col:'#98D0AC'},
  'Liga 1 Perú':{flag:'🇵🇪',sh:'PER',col:'#D91023'},
  'Primera A':{flag:'🇨🇴',sh:'COL',col:'#FCD116'},
  'Primera B':{flag:'🇨🇴',sh:'COL-B',col:'#A0522D'},
  'Austrian Bundesliga':{flag:'🇦🇹',sh:'AUT',col:'#ED2939'},
  'Keuken Kampioen Divisie':{flag:'🇳🇱',sh:'KKD',col:'#154273'},
  'Swiss Super League':{flag:'🇨🇭',sh:'SUI',col:'#D52B1E'},
  'Eliteserien':{flag:'🇳🇴',sh:'NOR',col:'#2E5C8A'},
  'División Profesional':{flag:'🇧🇴',sh:'BOL',col:'#D52B1E'},
  'Ligue 1':{flag:'🇫🇷',sh:'FRA',col:'#002395'},
  'Brasileirão Série A':{flag:'🇧🇷',sh:'BRA',col:'#FFDF00'},
  'Premier League':{flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',sh:'ENG',col:'#3D195B'},
  'La Liga':{flag:'🇪🇸',sh:'ESP',col:'#EE8707'},
  'Bundesliga':{flag:'🇩🇪',sh:'GER',col:'#D3010C'},
  'Championship':{flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',sh:'CHA',col:'#1D428A'},
  'Liga MX':{flag:'🇲🇽',sh:'MEX',col:'#0B6E4F'},
  'Scottish Premiership':{flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',sh:'SCO',col:'#003DA5'},
  'Saudi Pro League':{flag:'🇸🇦',sh:'KSA',col:'#006C35'},
  'La Liga 2':{flag:'🇪🇸',sh:'ESP2',col:'#C8102E'},
  'USL League One':{flag:'🇺🇸',sh:'USL1',col:'#F7941E'},
  'Prva HNL':{flag:'🇭🇷',sh:'CRO',col:'#E30613'},
  'LigaPro':{flag:'🇪🇨',sh:'ECU',col:'#FFDD00'},
  'Liga I':{flag:'🇷🇴',sh:'ROU',col:'#FFCD00'},
  'Persian Gulf Pro League':{flag:'🇮🇷',sh:'IRN',col:'#239F40'},
  'Serie A Ecuador':{flag:'🇪🇨',sh:'ECU',col:'#FFDD00'},
  'División de Honor':{flag:'🇵🇾',sh:'PAR',col:'#0038A8'},

  'Serie B':{flag:'🇮🇹',sh:'ITA2',col:'#7B2D8E'},
  'Ligue 2':{flag:'🇫🇷',sh:'FRA2',col:'#E4572E'},
  'Liga AUF':{flag:'🇺🇾',sh:'URU',col:'#75AADB'},
"J1 League":{"flag":"🇯🇵","sh":"JPN","col":"#BC002D"},"Betway Premiership":{"flag":"🇿🇦","sh":"RSA","col":"#FFB612"},"Ekstraklasa":{"flag":"🇵🇱","sh":"POL","col":"#DC143C"},"efbet Liga":{"flag":"🇧🇬","sh":"BUL","col":"#00966E"},"Liga FUTVE":{"flag":"🇻🇪","sh":"VEN","col":"#FCD116"},"Canadian Premier League":{"flag":"🇨🇦","sh":"CAN","col":"#FF0000"},"Liga de Primera":{"flag":"🇨🇱","sh":"CHI","col":"#D52B1E"},"K League 1":{"flag":"🇰🇷","sh":"KOR","col":"#003478"},"Chance Liga":{"flag":"🇨🇿","sh":"CZE","col":"#D7141A"},"Super League Greece":{"flag":"🇬🇷","sh":"GRE","col":"#0D5EAF"},'Bundesliga 2':{flag:'🇩🇪',sh:'GER2',col:'#7B2D8E'},'Primera B Nacional':{flag:'🇦🇷',sh:'ARG2',col:'#5B8FB9'},'Kazakhstan Premier League':{flag:'🇰🇿',sh:'KAZ',col:'#00AFCA'},'Campeonato Brasileiro Série A':{flag:'🇧🇷',sh:'BRA-H',col:'#00923F'},'Challenge League':{flag:'🇨🇭',sh:'SUI2',col:'#A63A3A'},'Champions League':{flag:'🏆',sh:'UCL',col:'#0033A0'},'Continental — Copa Libertadores / Copa Mercosul':{flag:'🏆',sh:'LIB',col:'#B8860B'},'Division 1':{flag:'🇫🇷',sh:'FRA-D1',col:'#1E3A8A'},'Ehrenpromotion':{flag:'🇱🇺',sh:'LUX2',col:'#F9A825'},'FA Youth Cup':{flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',sh:'FAYC',col:'#6A1B9A'},'National 1 (Ligue 3)':{flag:'🇫🇷',sh:'FRA3',col:'#7A9E7E'},'Primavera 1':{flag:'🇮🇹',sh:'PRIM',col:'#5C9EAD'},'Promotion League':{flag:'🇨🇭',sh:'SUI3',col:'#C97B63'},'Prva Liga':{flag:'🇸🇮',sh:'SVN',col:'#005DA4'},'U15 Regional':{flag:'🇫🇷',sh:'U15',col:'#9E9E9E'},'U17 Nationaux':{flag:'🇫🇷',sh:'U17',col:'#9E9E9E'},'U19 Final Phase':{flag:'🇫🇷',sh:'U19',col:'#9E9E9E'},'UEFA European U17 Championship Qualifying':{flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',sh:'U17Q',col:'#0033A0'},'UEFA European U19 Championship Qualifying (unconfirmed round)':{flag:'🇧🇪',sh:'U19Q',col:'#0033A0'},};
const SC = {
  'Argentine School':'#74ACDF','English School':'#4A7CC4','German School':'#FFCC00',
  'Italian School':'#009246','Global Masters':'#9B59B6','Dutch School':'#FF7100',
  'Spanish School':'#C60B1E','Brazilian School':'#009C3B','Scandinavian Masters':'#006AA7',
  'French School':'#003189','Belgian School':'#FAE042','Eastern European School':'#5B9BD5',
  'Hungarian School':'#CE2939','Scouting Revolution':'#1A5276','Modern Masters':'#E74C3C',
  'South American School':'#00A86B',
};
const POS_COLORS = {GK:'#EAB84E',DF:'#2DD4BF',MF:'#22D46A',FW:'#F04545'};

function fc(v){
  if(v>=80)return '#EDB84E';
  if(v>=65)return '#22D46A';
  if(v>=50)return '#2DD4BF';
  if(v>=30)return '#4A7CC4';
  return '#2A3A4E';
}
function fclass(v){
  if(v>=80)return '★★★ ELITE';
  if(v>=65)return '★★ EXCELLENT';
  if(v>=50)return '★ VERY GOOD';
  if(v>=35)return 'GOOD';
  if(v>=20)return 'STANDARD';
  return 'DEVELOPING';
}
var PENDING_COL='#5A6472';
function isPending(v){return v===null||v===undefined;}
function mcol(v){return isPending(v)?PENDING_COL:fc(v);}
function mtxtP(v,dec,p){
  if(!isPending(v)) return v.toFixed(dec===undefined?2:dec);
  if(p&&p.fgaProxy!==undefined&&p.fgaProxy!==null) return p.fgaProxy.toFixed(1)+'\u2020';
  return 'Not Graded';
}
function mcolP(v,p){
  if(!isPending(v)) return fc(v);
  if(p&&p.fgaProxy!==undefined&&p.fgaProxy!==null) return '#8A7645';
  return PENDING_COL;
}
function mtxt(v,dec){return isPending(v)?'Not Graded':v.toFixed(dec===undefined?2:dec);}
function fmtOrDash(v,dec){return v!=null?v.toFixed(dec):'—';}
function mbar(v){return isPending(v)?0:Math.round(v);}
function mraw(v){return isPending(v)?-1:v;}

// LOG_Total_Score — implemented 2026-08-18 per project spec:
// LOG_Total_Score = MIN(6.0, (Competition_Tier * Opposition_Quality * Match_Stakes * (1+Historical_Sig) *
//                              Pressure_Context * Performance_Stage * Competitive_Balance * Weather *
//                              Tactical_Opposition) / 2.8)
// This is a PER-MATCH formula, not a per-player season stat. It requires 9 named context factors for
// the specific match being scored. None of those 9 factors are captured anywhere in the platform's
// current data (player-season rows, or the video-scoring workbooks) — the match registers only log
// an "Opposition Tier" (1-3), which is a rough stand-in for Opposition_Quality alone, not the other 8.
// This function is the correct, live formula. It returns null rather than guessing whenever any
// required factor is missing — it will not silently default an unscored factor to 1.0 or any other
// placeholder, because that would fabricate match context that was never actually assessed.
//
// factors = {competitionTier, oppositionQuality, matchStakes, historicalSig, pressureContext,
//            performanceStage, competitiveBalance, weather, tacticalOpposition}
function computeLOGTotalScore(factors){
  if(!factors) return null;
  var req=['competitionTier','oppositionQuality','matchStakes','historicalSig','pressureContext',
           'performanceStage','competitiveBalance','weather','tacticalOpposition'];
  for(var i=0;i<req.length;i++){
    var v=factors[req[i]];
    if(v===undefined||v===null||isNaN(v)) return null; // missing factor -> not computable, not guessed
  }
  var product = factors.competitionTier * factors.oppositionQuality * factors.matchStakes *
                (1+factors.historicalSig) * factors.pressureContext * factors.performanceStage *
                factors.competitiveBalance * factors.weather * factors.tacticalOpposition;
  return Math.min(6.0, product/2.8);
}
// Player-level LOG (needed as CLU's LOG_Pressure_Factor input) = average of computeLOGTotalScore()
// across a player's registered/assessed matches, once those matches actually have all 9 factors
// logged. Given zero matches currently have that, this returns null for every player right now —
// which is correct, not a bug.
function computePlayerLOG(matchFactorsList){
  if(!matchFactorsList || !matchFactorsList.length) return null;
  var scores=[];
  for(var i=0;i<matchFactorsList.length;i++){
    var s=computeLOGTotalScore(matchFactorsList[i]);
    if(s!==null) scores.push(s);
  }
  if(!scores.length) return null;
  var sum=0; for(var j=0;j<scores.length;j++) sum+=scores[j];
  return sum/scores.length;
}
function gCell(p){return (p.pos==='GK'&&p.savePctGK!=null)?p.savePctGK.toFixed(1)+'%':p.g;}
function aCell(p){return (p.pos==='GK'&&p.csPctGK!=null)?p.csPctGK.toFixed(1)+'%':p.a;}
function gLbl(p){return (p.pos==='GK'&&p.savePctGK!=null)?'Save%':'Goals';}
function aLbl(p){return (p.pos==='GK'&&p.csPctGK!=null)?'Clean Sheet %':'Assists';}
function gTitle(p){return (p.pos==='GK'&&p.savePctGK!=null)?'Save% (GK stat, shown in place of Goals)':'';}
function aTitle(p){return (p.pos==='GK'&&p.csPctGK!=null)?'Clean Sheet % (GK stat, shown in place of Assists)':'';}


var filt=P.slice(), tgts=[], sKey='fga', sDir=-1, pg=1;
const PG=50;

function show(id){
  console.log('show called with id:', id);
  document.querySelectorAll('.tb').forEach(function(b){b.classList.remove('on')});
  document.querySelectorAll('.section').forEach(function(s){s.classList.remove('on')});
  var order=['dash','players','scout','targets','metrics','phil'];
  var i=order.indexOf(id);
  if(i>=0){var tabs=document.querySelectorAll('.tb');if(tabs[i])tabs[i].classList.add('on');}
  var sec=document.getElementById('s-'+id);
  if(sec)sec.classList.add('on');
  if(id==='players')renderTable();
  if(id==='targets')renderTargets();
  if(id==='metrics')renderMetrics();
  if(id==='phil')renderPhil();
  document.getElementById('content').scrollTop=0;
}


function populateLeagueDropdowns(){
  var counts={};
  P.forEach(function(p){ if(p.l) counts[p.l]=(counts[p.l]||0)+1; });
  var names=Object.keys(counts).sort(function(a,b){return a.localeCompare(b);});
  var fullOpts='<option value="">All Leagues</option>';
  var shortOpts='<option value="">All Leagues</option>';
  names.forEach(function(lg){
    var lt=LM[lg]||{flag:'',sh:(lg||'').slice(0,3),col:'#4A5A6E'};
    var esc=lg.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
    fullOpts+='<option value="'+esc+'">'+lt.flag+' '+esc+' ('+counts[lg]+')</option>';
    shortOpts+='<option value="'+esc+'">'+lt.flag+' '+lt.sh+'</option>';
  });
  ['f-lg'].forEach(function(id){var el=document.getElementById(id); if(el) el.innerHTML=fullOpts;});
  ['radar-lg','top-lg'].forEach(function(id){var el=document.getElementById(id); if(el) el.innerHTML=shortOpts;});
}

function initF(){
  SCHS.forEach(function(s){var o=document.createElement('option');o.value=s;o.textContent=s;document.getElementById('f-sch').appendChild(o);});
  MGRS.forEach(function(m){var o=document.createElement('option');o.value=m;o.textContent=m;document.getElementById('f-mgr').appendChild(o);});
  document.getElementById('fs').addEventListener('input',applyF);
  document.getElementById('f-lg').addEventListener('change',function(){updClubs();applyF();});
  ['f-cl','f-pos','f-sch','f-mgr'].forEach(function(id){document.getElementById(id).addEventListener('change',applyF);});
  ['f-amin','f-amax','f-fmin','f-fmax','f-ymin','f-ymax'].forEach(function(id){document.getElementById(id).addEventListener('input',applyF);});
}
function updClubs(){
  var lg=document.getElementById('f-lg').value;
  var sel=document.getElementById('f-cl');
  sel.innerHTML='<option value="">All Clubs</option>';
  var list=lg?(CLUBS[lg]||[]):[];
  if(!lg){var all=[];Object.values(CLUBS).forEach(function(a){a.forEach(function(c){all.push(c);});});all.sort();list=all;}
  list.forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;sel.appendChild(o);});
}

// ==== ULTIMATE INTEGRATION LAYER: CCI / CLU / HAR / ULT ====
// Source formulas supplied by Jim (2026-08-17). Two circular references were fixed before
// implementation:
//   - HAR originally referenced "LZ_Metric" which the 779-metric glossary defines as HAR's
//     own column (LZ = HAR). Fixed: that term now uses CRK directly, merged with the
//     formula's separate trailing CRK(x0.1) term into a single CRK(x0.5) term.
//   - ULT originally referenced "MZ" which the glossary defines as ULT's own column
//     (MZ = ULT). Fixed: that 0.20 weight is folded into HAR's weight inside ULT (0.10 -> 0.30),
//     since MZ and HAR were both described as "harmonic style / artistic flair composite".
// Every metric requires its FULL input set to be non-null before it computes. No partial or
// guessed values are produced — matches the platform's existing "PENDING until graded"
// convention and the empire-agents "evidence, not scores" principle.
function pct(str){
  if(str==null) return null;
  var m = String(str).match(/\(([\d.]+)%\)/);
  return m ? parseFloat(m[1]) : null;
}
function scaProxy(p){
  // Prefer FBref SCA90 (leagues with the Shot Creation table). Liga 1 Peru doesn't have that
  // table, so fall back to a Sofascore bigChancesCreated-per-90 proxy, flagged in console.
  if(p.sca90!=null) return Math.min(p.sca90,10);
  if(p.sofa && p.sofa.bigChancesCreated!=null && p.min>0){
    var per90 = p.sofa.bigChancesCreated/(p.min/90);
    return Math.min(per90*2,10);
  }
  return null;
}
function dribbleNorm(p){
  if(p.sofa && p.sofa.succDribbles!=null){
    var v = pct(p.sofa.succDribbles);
    return v==null?null:v/10;
  }
  return null;
}
function computeCCI(p){
  var t=p.tier3; if(!t) return null;
  var sca = scaProxy(p);
  if(t.crk==null||t.dma==null||t.soa==null||sca==null) return null;
  return +(t.crk*0.4 + t.dma*0.3 + t.soa*0.2 + sca*0.1).toFixed(2);
}
function computeCLU(p){
  var t=p.tier3; if(!t) return null;
  if(t.crs==null||t.clm==null||t.mcs==null||p.log==null) return null;
  return +(t.crs*0.5 + t.clm*0.2 + t.mcs*0.2 + p.log*0.1).toFixed(2);
}
function computeHAR(p){
  var t=p.tier3; if(!t) return null;
  var drb = dribbleNorm(p);
  if(t.crk==null||t.spi==null||drb==null) return null;
  return +(t.crk*0.5 + t.spi*0.3 + drb*0.2).toFixed(2);
}
function computeULT(p){
  var cci=computeCCI(p), clu=computeCLU(p), har=computeHAR(p);
  if(p.fga==null||p.thi==null||cci==null||clu==null||har==null||p.ctx==null) return null;
  return +(p.fga*0.25 + p.thi*0.15 + cci*0.15 + clu*0.10 + har*0.30 + p.ctx*0.05).toFixed(2);
}
function recomputeUltimateLayer(){
  var n=0;
  P.forEach(function(p){
    var cci=computeCCI(p), clu=computeCLU(p), har=computeHAR(p);
    if(cci!=null){p.cci=cci; n++;}
    if(clu!=null){p.clu=clu; n++;}
    if(har!=null){p.har=har; n++;}
    var ult=computeULT(p);
    if(ult!=null){p.ult=ult; n++;}
  });
  console.log('Ultimate Integration Layer: '+n+' field(s) populated across '+P.length+' players');
}
recomputeUltimateLayer();

// ==== VIDEO-ONLY PROXY LAYER: RMV / ultProxy ====
// Protocol added 2026-09-09 per Jim Totime: gives video-graded prospects (no Tier-1/Tier-2
// stats feed available -- FBref/Sofascore don't cover youth, regional or academy leagues) a
// usable interim number instead of a permanently-null FGA Rating. This does NOT touch FGA
// Rating itself, which stays reserved for the real stats-anchored composite -- it populates
// the separate "Stats+Video Proxy" (ultProxy) slot the UI already had a place for.
// RMV = Remaining Video Avg. = mean of whatever Tier-3 core sub-metrics (p.tier3{}) are graded.
// ultProxy = AVERAGE(OBI, SII, RMV) x 10, equal weight (Jim's call, 2026-09-09) -- only once
// all three are present. No partial or guessed value when an input is missing.
function computeRMV(p){
  if(!p.tier3) return null;
  var keys=Object.keys(p.tier3);
  if(!keys.length) return null;
  var sum=0; for(var i=0;i<keys.length;i++) sum+=p.tier3[keys[i]];
  return +(sum/keys.length).toFixed(2);
}
function computeUltProxy(p){
  var rmv = p.rmv!=null ? p.rmv : computeRMV(p);
  if(p.obi==null||p.sii==null||rmv==null) return null;
  return +(((p.obi+p.sii+rmv)/3)*10).toFixed(1);
}
function recomputeVideoProxyLayer(){
  var n=0;
  P.forEach(function(p){
    // gated to fullyT3's own primary condition (gradingProgress===12) -- matches the
    // platform's existing definition of "fully graded", so a partially-graded player
    // (e.g. 8/12) never gets promoted into the fully-graded summary display by accident.
    if(p.gradingProgress!==12) return;
    var rmv=computeRMV(p);
    if(rmv!=null && p.rmv==null){p.rmv=rmv;}
    var proxy=computeUltProxy(p);
    if(proxy!=null){p.ultProxy=proxy; n++;}
  });
  console.log('Video Proxy Layer: ultProxy populated for '+n+' player(s)');
}
recomputeVideoProxyLayer();
function goToLeague(lg){
  var sel=document.getElementById('f-lg');
  sel.value=lg;
  updClubs();
  applyF();
  show('players');
}
function applyF(){
  var s=(document.getElementById('fs').value||'').toLowerCase();
  var lg=document.getElementById('f-lg').value;
  var cl=document.getElementById('f-cl').value;
  var pos=document.getElementById('f-pos').value;
  var sch=document.getElementById('f-sch').value;
  var mgr=document.getElementById('f-mgr').value;
  var am=parseFloat(document.getElementById('f-amin').value)||0;
  var ax=parseFloat(document.getElementById('f-amax').value)||99;
  var fm=parseFloat(document.getElementById('f-fmin').value)||0;
  var fx=parseFloat(document.getElementById('f-fmax').value);if(isNaN(fx))fx=99;
  var ym=parseInt(document.getElementById('f-ymin').value)||1979;
  var yx=parseInt(document.getElementById('f-ymax').value)||2026;
  filt=P.filter(function(p){
    if(s&&p.n.toLowerCase().indexOf(s)<0)return false;
    if(lg&&p.l!==lg)return false;
    if(cl&&p.sq!==cl)return false;
    if(pos&&(p.pos||'').indexOf(pos)<0)return false;
    if(sch&&p.sch!==sch)return false;
    if(mgr&&p.mgr!==mgr)return false;
    if(p.age<am||p.age>ax)return false;
    if(!isPending(p.fga)&&(p.fga<fm||p.fga>fx))return false;
    var pym=(p.season||'2025-2026').match(/\d{4}/);var py=pym?parseInt(pym[0]):2025;
    if(py<ym||py>yx)return false;
    return true;
  });
  sortF();pg=1;
  var n=filt.length;
  document.getElementById('fcnt').textContent=n.toLocaleString();
  document.getElementById('cnt-p').textContent=n.toLocaleString();
  var ps=document.getElementById('s-players');
  if(ps&&ps.classList.contains('on'))renderTable();
}
function sortF(){
  filt.sort(function(a,b){
    var av=a[sKey]||0,bv=b[sKey]||0;
    if(typeof av==='string')av=av.toLowerCase();
    if(typeof bv==='string')bv=bv.toLowerCase();
    if(av<bv)return sDir;
    if(av>bv)return -sDir;
    // tie-break: cluster a player's multiple season/stint records together,
    // most recent season first, instead of leaving them scattered by array order
    if(a.pid!==b.pid)return a.pid<b.pid?-1:1;
    if(a.season!==b.season)return a.season<b.season?1:-1;
    return 0;
  });
}
function resetF(){
  ['fs','f-lg','f-cl','f-pos','f-sch','f-mgr','f-amin','f-amax','f-fmin','f-fmax','f-ymin','f-ymax'].forEach(function(id){var e=document.getElementById(id);if(e)e.value='';});
  filt=P.slice();sortF();pg=1;
  document.getElementById('fcnt').textContent=P.length.toLocaleString();
  document.getElementById('cnt-p').textContent=P.length.toLocaleString();
  var ps=document.getElementById('s-players');
  if(ps&&ps.classList.contains('on'))renderTable();
}
function setSort(k){
  if(sKey===k)sDir*=-1;else{sKey=k;sDir=k==='n'?1:-1;}
  document.querySelectorAll('.srtb').forEach(function(b){b.classList.remove('on');});
  var sb=document.getElementById('sb-'+k);if(sb)sb.classList.add('on');
  sortF();pg=1;renderTable();
}

function renderTable(){
  var tbody=document.getElementById('tbody');
  if(!tbody)return;
  var tot=filt.length,pages=Math.max(1,Math.ceil(tot/PG));
  if(pg>pages)pg=pages;
  var start=(pg-1)*PG,slice=filt.slice(start,start+PG);
  document.getElementById('pg-lbl').textContent=tot>0?'Showing '+(start+1)+'–'+Math.min(start+PG,tot)+' of '+tot.toLocaleString():'No results';
  var h='';
  slice.forEach(function(p,i){
    var rank=start+i+1;
    var fga=p.fga,ult=p.ult,fullyT3=(p.gradingProgress===12||(p.obi!=null&&p.sii!=null&&p.rmv!=null&&p.ultProxy!=null)),showProxy=(p.gradingProgress===12&&isPending(fga)&&p.ultProxy!=null),col=(isPending(fga)&&p.fgaProxy!=null)?mcolP(fga,p):(isPending(fga)&&fullyT3?'#5FA87A':mcol(fga)),pct=showProxy?Math.max(0,Math.min(100,Math.round(p.ultProxy))):((isPending(fga)&&p.fgaProxy!=null)?Math.round(p.fgaProxy):(isPending(fga)&&fullyT3?100:mbar(fga)));
    var lt=LM[p.l]||{flag:'',sh:(p.l||'').slice(0,3),col:'#4A5A6E'};
    var isTgt=tgts.some(function(t){return t.pid===p.pid&&t.season===p.season&&t.sq===p.sq;});
    var key=(p.pid+'|'+(p.season||'')+'|'+(p.sq||'')).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    h+='<tr class="dr">'+
      '<td style="padding-left:12px;font-family:var(--M);font-size:.6rem;color:var(--t3)">'+rank+'</td>'+
      '<td class="pname" onclick="openModal(\''+p.pid+'\',\''+(p.season||'')+'\',\''+(p.sq||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\')" title="Open player profile">'+(p.featured?'<span style="color:var(--gold)" title="Featured — Gallardo shortlist">\u2605 </span>':'')+(p.footageClips&&p.footageClips.length?'<i class="fas fa-film" style="color:var(--cyan);margin-right:5px;font-size:.68em" title="Video footage available — '+p.footageClips.length+' clip'+(p.footageClips.length>1?'s':'')+' in ESN archive"></i>':'')+p.n+'</td>'+
      '<td class="c"><span class="pos-chip '+p.pos+'">'+p.pos+'</span></td>'+
      '<td class="mono">'+p.age+'</td>'+
      '<td style="font-size:.75rem;color:var(--t2);max-width:140px;overflow:hidden;text-overflow:ellipsis" title="'+(p.sq||'')+'">'+( p.sq||'—')+wageBadge(p,true)+'</td>'+
      '<td class="c"><span class="lgchip" style="background:'+lt.col+'22;color:'+lt.col+';border:1px solid '+lt.col+'44" title="'+(p.season||'')+'">'+lt.flag+' '+lt.sh+(p.season?' <span style="opacity:.65;font-size:.85em">\''+p.season.slice(2,4)+'</span>':'')+'</span></td>'+
      '<td class="mono">'+p.mp+'</td>'+
      '<td class="mono" title="'+gTitle(p)+'">'+gCell(p)+'</td>'+
      '<td class="mono" title="'+aTitle(p)+'">'+aCell(p)+'</td>'+
      '<td style="background:rgba(201,146,26,.025)">'+
        '<div class="fga-cell">'+
          '<span class="fga-num" style="color:'+(p.gradingProgress!=null&&isPending(fga)?(p.gradingProgress>=9?'#5FA87A':'#C9A961'):col)+'">'+(showProxy?fmtOrDash(p.ultProxy,1)+'\u2020':(p.gradingProgress!=null&&isPending(fga)?p.gradingProgress+'/12 T3':mtxtP(fga,2,p)))+'</span>'+
          '<div class="fga-bar"><div class="fga-fill" style="width:'+pct+'%;background:'+col+'"></div></div>'+
          progressBadge(p,true)+
        '</div>'+
      '</td>'+
      (p.legend&&p.obi!=null&&p.sii!=null&&(fullyT3||(p.rmv!=null&&p.ultProxy!=null))?(
        '<td><div class="t3-badge t3-legend" title="Historical benchmark record — full Tier-3 grading, but a legacy comparison player, not a live prospect. Off-Ball Intelligence '+p.obi.toFixed(2)+' &middot; Sprint Intensity '+p.sii.toFixed(2)+' &middot; Remaining Video Metrics '+fmtOrDash(p.rmv,2)+' &middot; Stats+Video Proxy '+fmtOrDash(p.ultProxy,1)+'&dagger; &mdash; click player for full breakdown"><i class="fas fa-landmark"></i>LEGEND <span class="t3-mini">'+fmtOrDash(p.ultProxy,1)+'&dagger;</span></div></td>'
      ):(p.obi!=null&&p.sii!=null&&(fullyT3||(p.rmv!=null&&p.ultProxy!=null))?(
        '<td><div class="t3-badge t3-graded" title="Off-Ball Intelligence '+p.obi.toFixed(2)+' &middot; Sprint Intensity '+p.sii.toFixed(2)+' &middot; Remaining Video Metrics '+fmtOrDash(p.rmv,2)+' &middot; Stats+Video Proxy '+fmtOrDash(p.ultProxy,1)+'&dagger; &mdash; click player for full breakdown"><i class="fas fa-check-circle"></i>GRADED <span class="t3-mini">'+fmtOrDash(p.ultProxy,1)+'&dagger;</span></div></td>'
      ):(p.gradingProgress!=null&&p.gradingProgress>0?(
        '<td><div class="t3-badge t3-locked" title="Video grading in progress \u2014 '+p.gradingProgress+' of 12 core metrics confirmed. Click player for the full breakdown."><i class="fas fa-hourglass-half"></i>'+p.gradingProgress+'/12</div></td>'
      ):(
        '<td><div class="t3-badge t3-locked" title="Empire scouts assess character, decision-making, coachability and off-ball intelligence directly from match footage \u2014 the layer no stats platform replicates. Unlocks once this player is video-graded."><i class="fas fa-lock"></i>SCOUT INTEL</div></td>'
      ))))+
      '<td><span style="font-family:var(--B);font-size:.7rem;color:var(--t3);display:block;max-width:105px;overflow:hidden;text-overflow:ellipsis" title="'+(p.sch||'')+'">'+( p.mgr||'—')+'</span></td>'+
      '<td class="c">'+(isTgt?
        '<button class="actbtn rem" onclick="remTgt(this,\''+key+'\')"><i class="fas fa-minus"></i></button>':
        '<button class="actbtn add" onclick="addTgt(this,\''+key+'\')"><i class="fas fa-plus"></i></button>'
      )+'</td>'+
    '</tr>';
  });
  tbody.innerHTML=h;
  renderPgn(tot,pages);
}

function renderPgn(tot,pages){
  var el=document.getElementById('pgn');if(!el)return;
  if(pages<=1){el.innerHTML='';return;}
  var h='<button class="pgb" onclick="goPage('+(pg-1)+')"'+(pg===1?' disabled':'')+'>‹</button>';
  var r=[],prev=0;
  [1,pg-2,pg-1,pg,pg+1,pg+2,pages].forEach(function(n){
    if(n<1||n>pages)return;
    if(prev&&n-prev>1)r.push('…');
    if(n!==prev)r.push(n);
    prev=n;
  });
  r.forEach(function(x){
    if(x==='…')h+='<span class="pgdots">…</span>';
    else h+='<button class="pgb'+(x===pg?' on':'')+'" onclick="goPage('+x+')">' +x+'</button>';
  });
  h+='<button class="pgb" onclick="goPage('+(pg+1)+')"'+(pg===pages?' disabled':'')+'>›</button>';
  el.innerHTML=h;
}
function goPage(n){
  var max=Math.ceil(filt.length/PG);
  if(n<1||n>max)return;
  pg=n;renderTable();document.getElementById('content').scrollTop=0;
}

// SCOUTING TOOL
var scoutFilt=[];var scoutPgNum=1;var SCOUT_PG=24;
function initScoutF(){
  var natSet={};P.forEach(function(p){if(p.nat)natSet[p.nat]=true;});
  var nats=Object.keys(natSet).sort();
  var natSel=document.getElementById('sc-nat');
  nats.forEach(function(n){var o=document.createElement('option');o.value=n;o.textContent=n;natSel.appendChild(o);});
  document.getElementById('sc-lg').innerHTML+=document.getElementById('f-lg').innerHTML;
  updScoutClubs();
  document.getElementById('sc-lg').addEventListener('change',function(){updScoutClubs();scoutApplyF();});
  ['sc-nat','sc-pos','sc-cl'].forEach(function(id){document.getElementById(id).addEventListener('change',scoutApplyF);});
  ['sc-amin','sc-amax','sc-gmin','sc-fmin','sc-fmax'].forEach(function(id){document.getElementById(id).addEventListener('input',scoutApplyF);});
  document.getElementById('sc-graded').addEventListener('change',scoutApplyF);
  scoutApplyF();
}
function updScoutClubs(){
  var lg=document.getElementById('sc-lg').value;
  var sel=document.getElementById('sc-cl');
  sel.innerHTML=sel.options[0].outerHTML;
  var list=lg?(CLUBS[lg]||[]):[];
  if(!lg){var all=[];Object.values(CLUBS).forEach(function(a){a.forEach(function(c){all.push(c);});});all.sort();list=all;}
  list.forEach(function(c){var o=document.createElement('option');o.value=c;o.textContent=c;sel.appendChild(o);});
}
function scoutApplyF(){
  var nat=document.getElementById('sc-nat').value;
  var pos=document.getElementById('sc-pos').value;
  var lg=document.getElementById('sc-lg').value;
  var cl=document.getElementById('sc-cl').value;
  var am=parseFloat(document.getElementById('sc-amin').value)||0;
  var ax=parseFloat(document.getElementById('sc-amax').value)||99;
  var gm=parseFloat(document.getElementById('sc-gmin').value)||0;
  var fm=parseFloat(document.getElementById('sc-fmin').value);
  var fx=parseFloat(document.getElementById('sc-fmax').value);
  var gradedOnly=document.getElementById('sc-graded').checked;
  scoutFilt=P.filter(function(p){
    if(nat&&p.nat!==nat)return false;
    if(pos&&(p.pos||'').indexOf(pos)<0)return false;
    if(lg&&p.l!==lg)return false;
    if(cl&&p.sq!==cl)return false;
    if(p.age<am||p.age>ax)return false;
    if((p.g||0)<gm)return false;
    if(gradedOnly&&isPending(p.fga))return false;
    if(!isNaN(fm)&&!isPending(p.fga)&&p.fga<fm)return false;
    if(!isNaN(fx)&&!isPending(p.fga)&&p.fga>fx)return false;
    return true;
  });
  scoutFilt.sort(function(a,b){var av=isPending(a.fga)?-1:a.fga,bv=isPending(b.fga)?-1:b.fga;return bv-av;});
  scoutPgNum=1;
  renderScoutCards();
}
function scoutResetF(){
  ['sc-nat','sc-pos','sc-lg','sc-cl','sc-amin','sc-amax','sc-gmin','sc-fmin','sc-fmax'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('sc-graded').checked=false;
  updScoutClubs();
  scoutApplyF();
}
function esnPhotoFallback(img,pos,posCol){
  var span=document.createElement('span');
  span.className='pos-chip';
  span.style.background=posCol+'22';
  span.style.color=posCol;
  span.textContent=pos;
  img.replaceWith(span);
}
function renderScoutCards(){
  var grid=document.getElementById('scout-grid');
  var tot=scoutFilt.length;
  document.getElementById('scout-count').textContent=tot.toLocaleString();
  var slice=scoutFilt.slice(0,scoutPgNum*SCOUT_PG);
  if(!tot){grid.innerHTML='<div class="scout-empty">No players match these filters. Try widening the range.</div>';document.getElementById('scout-more').style.display='none';return;}
  var h='';
  slice.forEach(function(p){
    var lt=LM[p.l]||{flag:'',sh:(p.l||'').slice(0,3),col:'#4A5A6E'};
    var posCol=POS_COLORS[p.pos]||'#8BA5C0';
    var fgaTxt=isPending(p.fga)?'—':p.fga.toFixed(1);
    var fgaCol=isPending(p.fga)?'#44627A':mcol(p.fga);
    h+='<div class="scout-card" onclick="openModal(\''+p.pid+'\',\''+(p.season||'')+'\',\''+(p.sq||'').replace(/\\/g,'\\\\').replace(/\'/g,"\\'")+'\')">'+
      '<div class="scout-card-top">'+(p.photo?('<img class="scout-card-photo" src="'+p.photo+'" alt="" onerror="esnPhotoFallback(this,\''+p.pos+'\',\''+posCol+'\')">'):('<span class="pos-chip" style="background:'+posCol+'22;color:'+posCol+'">'+p.pos+'</span>'))+'<span class="scout-card-age">'+p.age+'</span></div>'+
      '<div class="scout-card-name">'+p.n+'</div>'+
      '<div class="scout-card-meta">'+p.nat+' &middot; '+(p.sq||'—')+'</div>'+
      '<div class="scout-card-league" style="color:'+lt.col+'">'+lt.flag+' '+lt.sh+'</div>'+
      '<div class="scout-card-stats">'+
        '<div><span class="scn">'+p.mp+'</span><span class="scl">MP</span></div>'+
        '<div><span class="scn">'+p.g+'</span><span class="scl">Goals</span></div>'+
        '<div><span class="scn" style="color:'+fgaCol+'">'+fgaTxt+'</span><span class="scl">FGA</span></div>'+
      '</div>'+
    '</div>';
  });
  grid.innerHTML=h;
  document.getElementById('scout-more').style.display=(tot>slice.length)?'block':'none';
}
function scoutLoadMore(){scoutPgNum++;renderScoutCards();}

// MODAL
function footageBtns(p){
  if(!p.footageClips||!p.footageClips.length)return '';
  return '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">'+p.footageClips.map(function(v){
    if(v.dbLink)return '<a class="t3-watch" href="'+v.dbLink+'" target="_blank" rel="noopener" title="'+v.file+'"><i class="fas fa-play-circle"></i>Watch Footage</a>';
    return '<span class="t3-watch" style="opacity:.75;cursor:default;background:rgba(45,212,191,.08);border-color:rgba(45,212,191,.3);color:var(--cyan)" title="In ESN Dropbox: '+v.dbPath+'"><i class="fas fa-film"></i>'+v.file+'</span>';
  }).join('')+'</div>';
}
function openModal(pid,season,squad){
  var p=P.find(function(x){return x.pid===pid&&x.season===season&&x.sq===squad;});
  if(!p)p=P.find(function(x){return x.pid===pid&&x.season===season;});
  if(!p)p=P.find(function(x){return x.pid===pid;});
  if(!p)return;
  var fga=p.fga,ult=p.ult,cci=p.cci,clu=p.clu,har=p.har,log=p.log,tmf=p.tmf,ctx=p.ctx;
  var fullyT3=(p.gradingProgress===12||(p.obi!=null&&p.sii!=null&&p.rmv!=null&&p.ultProxy!=null));
  var col=(isPending(fga)&&p.fgaProxy!=null)?mcolP(fga,p):(isPending(fga)&&fullyT3?'#5FA87A':mcol(fga)),cls=isPending(fga)?(p.gradingProgress!=null?p.gradingProgress+'/12 TIER 3 VALIDATED':(p.fgaProxy!=null?'FGA PROXY \u2014 STATS ONLY, TIER 3 PENDING':'AWAITING GRADING')):fclass(fga);
  var lt=LM[p.l]||{flag:'',sh:'',col:'#4A5A6E'};
  var schCol=SC[p.sch]||'#4A5A6E';
  var posCol=POS_COLORS[p.pos]||'#8BA5C0';
  // Build local profile filename: "Alex Luna" → "Alex_Luna.html"
  var profileFile=p.n.trim().replace(/\s+/g,'_')+'.html';
  var hasProfile=EXISTING_PROFILES.has(profileFile);

  var html=
    '<div class="m-top">'+
      avatarBlock(p,posCol)+
      '<div>'+
        '<div class="m-name">'+p.n+(p.footageClips&&p.footageClips.length?' <i class="fas fa-film" style="color:var(--cyan);font-size:.6em;vertical-align:middle" title="Video footage available"></i>':'')+'</div>'+
        '<div class="m-meta">'+(p.nat||'—')+' · '+(p.age!=null?p.age+' yrs':'age —')+' · '+(p.sq||'—')+wageBadge(p)+'</div>'+
        '<div class="m-league" style="color:'+lt.col+'">'+lt.flag+' '+(p.l||'—')+'</div>'+
        (hasProfile
          ?'<a class="tm-link" href="'+profileFile+'" target="_blank" rel="noopener"><i class="fas fa-user-circle tm-icon"></i> View Full Profile <i class="fas fa-chevron-right tm-icon" style="font-size:.55rem;opacity:.7;margin-left:2px"></i></a>'
          :'<span class="tm-link" style="opacity:.4;cursor:default" title="Written profile not published yet"><i class="fas fa-clock tm-icon"></i> Profile Coming Soon</span>')+
        (p.reportPdf
          ?'<a class="tm-link" href="'+p.reportPdf+'" target="_blank" rel="noopener" style="margin-left:8px"><i class="fas fa-file-pdf tm-icon"></i> View Scouting Report <i class="fas fa-chevron-right tm-icon" style="font-size:.55rem;opacity:.7;margin-left:2px"></i></a>'
          :'')+
      '</div>'+
    '</div>'+
    '<div class="m-body">'+
      (p.dob||p.pob||p.foot||p.ht||p.wt||p.firstClubPT||p.contractEnd?(
        '<div class="m-sec"><i class="fas fa-id-card" style="margin-right:5px;opacity:.6"></i>Player Info</div>'+
        '<div class="stats-row">'+
          (p.dob?'<div class="sbox"><div class="sbox-n" style="font-size:.8em">'+p.dob+'</div><div class="sbox-l">Born</div></div>':'')+
          (p.pob?'<div class="sbox"><div class="sbox-n" style="font-size:.7em">'+p.pob+'</div><div class="sbox-l">Birthplace</div></div>':'')+
          (p.ht?'<div class="sbox"><div class="sbox-n">'+p.ht.toFixed(2)+'m</div><div class="sbox-l">Height</div></div>':'')+
          (p.wt?'<div class="sbox"><div class="sbox-n">'+p.wt+'kg</div><div class="sbox-l">Weight</div></div>':'')+
          (p.foot?'<div class="sbox"><div class="sbox-n" style="font-size:.85em">'+p.foot+'</div><div class="sbox-l">Dominant Foot</div></div>':'')+
          (p.firstClubPT?'<div class="sbox"><div class="sbox-n" style="font-size:.75em">'+p.firstClubPT+'</div><div class="sbox-l">First Club (PT)</div></div>':'')+
          (p.contractEnd?'<div class="sbox"><div class="sbox-n">'+p.contractEnd+'</div><div class="sbox-l">Contract End</div></div>':'')+
        '</div>'
      ):'')+
      (p.bioNote?(
        '<div class="m-sec"><i class="fas fa-flag" style="margin-right:5px;opacity:.6"></i>Argentina National Team</div>'+
        '<div class="stats-row">'+
          (p.nick?'<div class="sbox"><div class="sbox-n" style="font-size:.95em">'+p.nick+'</div><div class="sbox-l">Nickname</div></div>':'')+
          (p.intCaps!=null?'<div class="sbox"><div class="sbox-n">'+p.intCaps+'</div><div class="sbox-l">Caps</div></div>':'')+
          (p.intGoals!=null?'<div class="sbox"><div class="sbox-n">'+p.intGoals+'</div><div class="sbox-l">Int&#39;l Goals</div></div>':'')+
        '</div>'+
        '<div class="t3-real-note" style="margin-top:6px;margin-bottom:4px;opacity:.85">'+p.bioNote.replace(/</g,'&lt;')+'</div>'
      ):'')+
      '<div class="m-sec"><i class="fas fa-chart-bar" style="margin-right:5px;opacity:.6"></i>Season Statistics'+(p.season?' &mdash; '+p.season:'')+'</div>'+
      '<div class="stats-row">'+
        '<div class="sbox"><div class="sbox-n">'+(p.mp!=null?p.mp:'—')+'</div><div class="sbox-l">Matches</div></div>'+
        '<div class="sbox"><div class="sbox-n">'+Math.round((p.min||0)/90)+'</div><div class="sbox-l">90s Played</div></div>'+
        '<div class="sbox"><div class="sbox-n">'+gCell(p)+'</div><div class="sbox-l">'+gLbl(p)+'</div></div>'+
        '<div class="sbox"><div class="sbox-n">'+aCell(p)+'</div><div class="sbox-l">'+aLbl(p)+'</div></div>'+
        '<div class="sbox"><div class="sbox-n">'+(p.pos==='GK'&&p.ga90GK!=null?p.ga90GK.toFixed(2):(p.g+p.a))+'</div><div class="sbox-l">'+(p.pos==='GK'&&p.ga90GK!=null?'GA per 90':'G + A')+'</div></div>'+
      '</div>'+

      (p.careerSeasonsPT!=null?(
        '<div class="m-sec"><i class="fas fa-layer-group" style="margin-right:5px;opacity:.6"></i>Career Totals (Portugal top flight, to date)</div>'+
        '<div class="stats-row">'+
          '<div class="sbox"><div class="sbox-n">'+p.careerSeasonsPT+'</div><div class="sbox-l">Seasons</div></div>'+
          '<div class="sbox"><div class="sbox-n">'+p.careerMP+'</div><div class="sbox-l">Matches</div></div>'+
          '<div class="sbox"><div class="sbox-n">'+p.careerG+'</div><div class="sbox-l">Goals</div></div>'+
        '</div>'
      ):'')+

      (p.t1?(
        '<div class="m-sec"><i class="fas fa-list-ol" style="margin-right:5px;opacity:.6"></i>Advanced Stats'+(p.t1.source?' <span style="opacity:.5;font-weight:400;font-size:.75em">('+p.t1.source+')</span>':'')+'</div>'+
        '<div class="stats-row">'+
        Object.keys(p.t1).filter(function(k){return k!=='source'&&p.t1[k]!=null;}).map(function(k){
          var lbl=({shots:'Shots',sot:'Shots on Target',fouls:'Fouls Committed',fouled:'Fouls Suffered',crosses:'Crosses',offside:'Offsides',tklW:'Tackles Won',pkwon:'Penalties Won',pkcon:'Penalties Conceded',og:'Own Goals',passes:'Passes',err:'Errors',sentOffs:'Sent Off'})[k]||k;
          return '<div class="sbox"><div class="sbox-n">'+p.t1[k]+'</div><div class="sbox-l">'+lbl+'</div></div>';
        }).join('')+
        '</div>'
      ):'')+

      '<div class="m-sec"><i class="fas fa-sitemap" style="margin-right:5px;opacity:.6"></i>FGA Rating Breakdown</div>'+
      '<div class="fga-hier">'+
        '<div class="hier-card main">'+
          '<div class="hier-code" style="color:var(--gold)">★ FGA RATING — CORE</div>'+
          '<div class="hier-val" style="color:'+(p.gradingProgress!=null&&isPending(fga)?(p.gradingProgress>=9?'#5FA87A':'#C9A961'):col)+'">'+(p.gradingProgress!=null&&isPending(fga)?p.gradingProgress+'/12':mtxtP(fga,3,p))+'</div>'+
          '<div class="hier-lbl" style="color:'+(p.tier2Complete?'#5FA87A':(p.gradingProgress!=null&&isPending(fga)?'var(--t2)':'var(--gold)'))+'">'+(p.tier2Complete?'✓ COMPLETE — T1 + T3 + all '+p.tier2Applicable+' currently-possible T2 metrics':(p.gradingProgress!=null&&isPending(fga)?'TIER 3 VALIDATED — FGA composite awaits Tier 2':cls))+'</div>'+
          '<div class="hier-bar"><div class="hier-bar-fill" style="width:'+(isPending(fga)&&fullyT3?100:mbar(fga))+'%;background:'+col+'"></div></div>'+
        '</div>'+
        '</div>'+
      '<div class="m-sec"><i class="fas fa-video" style="margin-right:5px;opacity:.6"></i>Tier 3 &middot; Scout Intelligence</div>'+
      (p.obi!=null&&p.sii!=null&&(fullyT3||(p.rmv!=null&&p.ultProxy!=null))?
        '<div class="t3-real">'+
          '<div class="t3-real-row">'+
            '<div class="t3-real-box"><div class="t3-real-n">'+p.obi.toFixed(2)+'</div><div class="t3-real-l">Off-Ball Intelligence</div></div>'+
            '<div class="t3-real-box"><div class="t3-real-n">'+p.sii.toFixed(2)+'</div><div class="t3-real-l">Sprint Intensity</div></div>'+
            '<div class="t3-real-box"><div class="t3-real-n">'+fmtOrDash(p.rmv,2)+'</div><div class="t3-real-l">Remaining Video Avg.</div></div>'+
            '<div class="t3-real-box"><div class="t3-real-n" style="color:var(--amber)">'+(p.ultProxy!=null?p.ultProxy.toFixed(1)+'&dagger;':'—')+'</div><div class="t3-real-l">Stats+Video Proxy</div></div>'+
          '</div>'+
          '<div class="t3-real-note">Graded by Empire scouts from full-match footage'+(p.gradingProgress!=null?' &mdash; '+p.gradingProgress+' of 12 core metrics logged with timestamped evidence':'')+'. This is the layer a stats feed cannot produce.</div>'+
          footageBtns(p)+
        '</div>'
      :(p.gradingProgress!=null&&p.tier3!=null?
        '<div class="t3-partial">'+
          '<div class="t3-partial-head"><i class="fas fa-hourglass-half"></i> Grading in progress &mdash; '+p.gradingProgress+' of 12 core metrics confirmed</div>'+
          '<div class="t3-partial-bar-wrap"><div class="t3-partial-bar"><div class="t3-partial-fill" style="width:'+(p.gradingProgress/12*100)+'%"></div></div></div>'+
          '<div class="t3-real-row">'+
            Object.keys(p.tier3).map(function(k){return '<div class="t3-real-box"><div class="t3-real-n" style="color:#C9A961">'+p.tier3[k].toFixed(2)+'</div><div class="t3-real-l">'+k.toUpperCase()+'</div></div>';}).join('')+
          '</div>'+
          '<div class="t3-real-note">Confirmed sub-metrics only, shown as-is &mdash; no headline OBI/SII/composite score yet, that would overstate what\'s actually confirmed. Full breakdown in Grading Status below.</div>'+
          (p.phi9!=null?(
            '<div class="t3-real-note" style="margin-top:8px;font-weight:600;opacity:.85">Philosophy-Fit Metrics'+(p.phi9Note?' <i class="fas fa-info-circle" style="cursor:help;opacity:.6" title="'+p.phi9Note.replace(/"/g,'&quot;')+'"></i>':'')+'</div>'+
            '<div class="t3-real-row">'+
              Object.keys(p.phi9).map(function(k){return '<div class="t3-real-box"><div class="t3-real-n" style="color:#8BA5C0">'+p.phi9[k].toFixed(2)+'</div><div class="t3-real-l">'+k.toUpperCase()+'</div></div>';}).join('')+
            '</div>'
          ):'')+
          (p.foundation5!=null?(
            '<div class="t3-real-note" style="margin-top:8px;font-weight:600;opacity:.85">Foundation Metrics'+(p.foundation5Note?' <i class="fas fa-info-circle" style="cursor:help;opacity:.6" title="'+p.foundation5Note.replace(/"/g,'&quot;')+'"></i>':'')+'</div>'+
            '<div class="t3-real-row">'+
              Object.keys(p.foundation5).map(function(k){return '<div class="t3-real-box"><div class="t3-real-n" style="color:#5FA87A">'+p.foundation5[k].toFixed(2)+'</div><div class="t3-real-l">'+k.toUpperCase()+'</div></div>';}).join('')+
            '</div>'
          ):'')+
          (p.extraMetrics!=null?(
            '<div class="t3-real-note" style="margin-top:8px;font-weight:600;opacity:.85">Additional Graded Metrics'+(p.extraMetricsNote?' <i class="fas fa-info-circle" style="cursor:help;opacity:.6" title="'+p.extraMetricsNote.replace(/"/g,'&quot;')+'"></i>':'')+'</div>'+
            '<div class="t3-real-row">'+
              Object.keys(p.extraMetrics).map(function(k){return '<div class="t3-real-box"><div class="t3-real-n" style="color:var(--amber)">'+p.extraMetrics[k].toFixed(2)+'</div><div class="t3-real-l">'+k.toUpperCase()+'</div></div>';}).join('')+
            '</div>'
          ):'')+
          (p.mob!=null?(
            '<div class="t3-real-note" style="margin-top:8px;font-weight:600;opacity:.85">Tier 2 Composite'+(p.mobNote?' <i class="fas fa-info-circle" style="cursor:help;opacity:.6" title="'+p.mobNote.replace(/"/g,'&quot;')+'"></i>':'')+'</div>'+
            '<div class="t3-real-row">'+
              '<div class="t3-real-box"><div class="t3-real-n" style="color:var(--gold)">'+p.mob.toFixed(2)+'</div><div class="t3-real-l">MOB</div></div>'+
            '</div>'
          ):'')+
          footageBtns(p)+
        '</div>'
      :
        '<div class="t3-pitch">'+
          '<div class="t3-pitch-head"><i class="fas fa-lock"></i> Not yet video-graded</div>'+
          '<div class="t3-pitch-body">Stats can tell you what happened. They cannot tell you <b>why</b>, or whether it repeats. Empire scouts watch full matches and grade what a data feed physically cannot see:</div>'+
          '<ul class="t3-pitch-list">'+
            '<li><b>Decision-making</b> under pressure, not just outcomes</li>'+
            '<li><b>Character &amp; coachability</b> &mdash; the traits that make or break a transfer</li>'+
            '<li><b>Off-ball intelligence</b> &mdash; anticipation, spacing, movement no box score shows</li>'+
            '<li><b>Timestamped evidence</b> for every score &mdash; no number without a clip behind it</li>'+
          '</ul>'+
          '<div class="t3-pitch-note">This is what separates Empire FGA from a stats platform. It unlocks the moment this player is assessed.</div>'+
          footageBtns(p)+
        '</div>'
      ))+
      '<div class="m-sec"><i class="fas fa-clipboard-check" style="margin-right:5px;opacity:.6"></i>Grading Status</div>'+
      '<div class="status-grid">'+
        '<div class="status-row"><span class="status-lbl">Season Data</span><span class="status-val" style="color:#5FA87A">Complete</span></div>'+
        '<div class="status-row"><span class="status-lbl">Video Analysis</span><span class="status-val" style="color:'+(p.gradingProgress>=12?'#5FA87A':(p.gradingProgress>=1?'#C9A961':'var(--t3)'))+'">'+(p.gradingProgress!=null?p.gradingProgress+' of 12 metrics':'Not yet started')+'</span></div>'+
        '<div class="status-row"><span class="status-lbl">Composite Rating</span><span class="status-val" style="color:'+(isPending(fga)?'var(--t3)':'#5FA87A')+'">'+(isPending(fga)?'Pending':'Complete')+'</span></div>'+
      '</div>'
    '</div>';

  document.getElementById('mc').innerHTML=html;
  document.getElementById('ov').classList.add('show');
}
function avatarBlock(p,posCol){
  if(p.photo){
    return "<img src='"+p.photo+"' class='m-pos m-photo' alt='' onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\">"+
      "<div class='m-pos' style='display:none;background:"+posCol+"22;color:"+posCol+";border:1px solid "+posCol+"44'>"+p.pos+"</div>";
  }
  return '<div class="m-pos '+p.pos+'" style="background:'+posCol+'22;color:'+posCol+';border:1px solid '+posCol+'44">'+p.pos+'</div>';
}
function progressBadge(p,compact){
  if(p.gradingProgress===undefined||p.gradingProgress===null) return '';
  var n=p.gradingProgress, col = n>=9?'#5FA87A':(n>=1?'#C9A961':'#5A6472');
  var label = n+'/12 Tier 3 validated';
  if(compact){
    return '<span title="'+label+'" style="display:inline-block;font-family:\'IBM Plex Mono\',monospace;font-size:9px;font-weight:600;padding:1px 5px;border-radius:2px;border:1px solid '+col+';color:'+col+';margin-left:5px">'+n+'/12</span>';
  }
  return '<span style="display:inline-block;font-family:\'IBM Plex Mono\',monospace;font-size:11px;padding:3px 9px;border-radius:2px;border:1px solid '+col+';color:'+col+'">'+label+'</span>';
}
function wageBadge(p,compact){
  if(!p.wageTier || !p.featured) return '';
  var map = {
    high: {label:'€€€ High wage tier (club-reported)', short:'€€€', col:'#C9A961'},
    confirmed_mid: {label:'€800\u2013€1,500/mo (club-reported)', short:'€', col:'#5FA87A'},
    unconfirmed: {label:'Wage tier unconfirmed', short:'?', col:'#5A6472'}
  };
  var m = map[p.wageTier];
  if(!m) return '';
  if(compact){
    return '<span title="'+m.label+'" style="display:inline-block;font-family:\'IBM Plex Mono\',monospace;font-size:9px;font-weight:600;padding:1px 4px;border-radius:2px;border:1px solid '+m.col+';color:'+m.col+';margin-left:5px">'+m.short+'</span>';
  }
  return '<span class="wage-badge" style="display:inline-block;font-family:\'IBM Plex Mono\',monospace;font-size:10px;padding:2px 7px;border-radius:2px;border:1px solid '+m.col+';color:'+m.col+';margin-left:6px">'+m.label+'</span>';
}
function mkSub(code,name,desc,val,league){
  var col=mcol(val),pct=mbar(val);
  return '<div class="sub-c">'+
    '<div class="sub-code">'+code+'</div>'+
    '<div class="sub-val" style="color:'+col+'">'+mtxt(val,2)+'</div>'+
    '<div class="sub-name">'+name+'</div>'+
    '<div class="sub-desc">'+desc+'</div>'+
    '<div class="sub-minbar"><div class="sub-minbar-fill" style="width:'+pct+'%;background:'+col+'"></div></div>'+
  '</div>';
}
function closeModal(e){
  if(!e||e.target===document.getElementById('ov'))
    document.getElementById('ov').classList.remove('show');
}
document.addEventListener('keydown',function(e){if(e.key==='Escape')document.getElementById('ov').classList.remove('show');});

// TARGETS
function addTgt(btn,key){
  var parts=key.split('|'),pid=parts[0],season=parts[1]||'',sq=parts[2]||'';
  var player=P.find(function(p){return p.pid===pid&&p.season===season&&p.sq===sq;});
  if(!player||tgts.some(function(t){return t.pid===pid&&t.season===season&&t.sq===sq;}))return;
  if(tgts.length>=20){alert('Maximum 20 targets');return;}
  tgts.push(player);updBadge();
  if(btn){btn.className='actbtn rem';btn.innerHTML='<i class="fas fa-minus"></i>';btn.setAttribute('onclick','remTgt(this,\''+key+'\')');}
}
function remTgt(btn,key){
  var parts=key.split('|');
  tgts=tgts.filter(function(t){return!(t.pid===parts[0]&&t.season===(parts[1]||'')&&t.sq===(parts[2]||''));});
  updBadge();
  if(btn){btn.className='actbtn add';btn.innerHTML='<i class="fas fa-plus"></i>';btn.setAttribute('onclick','addTgt(this,\''+key+'\')');}
  var ts=document.getElementById('s-targets');
  if(ts&&ts.classList.contains('on'))renderTargets();
}
function clearAll(){tgts=[];updBadge();renderTargets();renderTable();}
function updBadge(){
  var n=tgts.length;
  var ct=document.getElementById('cnt-t');if(ct)ct.textContent=n;
  var dt=document.getElementById('d-tgt');if(dt)dt.textContent=n;
  var cb=document.getElementById('clr-btn');if(cb)cb.style.display=n>0?'':'none';
}
function renderTargets(){
  var g=document.getElementById('tgt-grid');if(!g)return;
  if(!tgts.length){
    g.innerHTML='<div class="empty" style="grid-column:1/-1"><div class="empty-i"><i class="fas fa-crosshairs"></i></div><div class="empty-m">No Targets</div><div class="empty-s">Click + on any player to start your watchlist</div></div>';
    document.getElementById('cmp-w').style.display='none';return;
  }
  g.innerHTML=tgts.map(function(p){
    var fga=p.fga,col=mcol(fga);
    var key=(p.pid+'|'+(p.season||'')+'|'+(p.sq||'')).replace(/'/g,"\\'");
    return '<div class="tgt-card">'+
      '<button class="tgt-rem" onclick="remTgt(null,\''+key+'\')">✕</button>'+
      '<div class="tgt-name">'+p.n+'</div>'+
      '<div class="tgt-meta">'+p.pos+' · '+p.age+'y · '+(p.sq||'—')+' · '+(LM[p.l]||{}).flag+' '+(p.l||'—')+'</div>'+
      '<div class="tgt-ms">'+
        '<div class="tgt-m"><div class="tgt-mv" style="color:'+col+'">'+mtxt(fga,2)+'</div><div class="tgt-ml">FGA</div></div>'+
        '<div class="tgt-m"><div class="tgt-mv" style="color:'+mcol(p.ult)+'">'+mtxt(p.ult,2)+'</div><div class="tgt-ml">ULT</div></div>'+
        '<div class="tgt-m"><div class="tgt-mv">'+gCell(p)+'</div><div class="tgt-ml">'+gLbl(p)+'</div></div>'+
        '<div class="tgt-m"><div class="tgt-mv">'+aCell(p)+'</div><div class="tgt-ml">'+aLbl(p)+'</div></div>'+
      '</div>'+
      '<div class="tgt-phil">⚽ '+(p.mgr||'—')+' · '+(p.sch||'—')+'</div>'+
    '</div>';
  }).join('');
  var cw=document.getElementById('cmp-w');
  if(tgts.length>=2){cw.style.display='';renderCmp();}else cw.style.display='none';
}
function renderCmp(){
  var t=document.getElementById('cmptbl');if(!t)return;
  var cols=tgts.slice(0,6);
  var rows=[
    ['Pos',function(p){return p.pos;}],
    ['Age',function(p){return p.age;}],
    ['Club',function(p){return p.sq||'—';}],
    ['League',function(p){return p.l||'—';}],
    ['MP',function(p){return p.mp;}],
    ['Goals',function(p){return gCell(p);}],
    ['Assists',function(p){return aCell(p);}],
    ['FGA',function(p){return mtxt(p.fga,1);}],
    ['ULT',function(p){return mtxt(p.ult,1);}],
    ['CCI',function(p){return mtxt(p.cci,2);}],
    ['CLU',function(p){return mtxt(p.clu,2);}],
    ['HAR',function(p){return mtxt(p.har,2);}],
    ['LOG',function(p){return mtxt(p.log,2);}],
    ['Manager',function(p){return p.mgr||'—';}],
  ];
  var h='<thead><tr><th class="rh">Metric</th>';
  cols.forEach(function(p){h+='<th>'+p.n.split(' ').slice(-1)[0]+'</th>';});
  h+='</tr></thead><tbody>';
  rows.forEach(function(r){
    h+='<tr><td class="rh">'+r[0]+'</td>';
    var vals=cols.map(r[1]);
    var nums=vals.map(parseFloat).filter(function(v){return!isNaN(v);});
    var mx=nums.length>1?Math.max.apply(null,nums):null;
    vals.forEach(function(v){
      var best=mx!==null&&parseFloat(v)===mx;
      h+='<td'+(best?' class="best"':'')+'>'+v+'</td>';
    });
    h+='</tr>';
  });
  h+='</tbody>';t.innerHTML=h;
}

// CHARTS
function drawCharts(){
  // Leagues
  var el=document.getElementById('ch-lg');
  if(el){
    var data=[{l:'MLS',c:LC.MLS||0},{l:'Primera División',c:LC['Primera División']||0},{l:'Eredivisie',c:LC.Eredivisie||0},{l:'Jupiler Pro League',c:LC['Jupiler Pro League']||0},{l:'Danish Superliga',c:LC['Danish Superliga']||0},{l:'Primeira Liga',c:LC['Primeira Liga']||0},{l:'Süper Lig',c:LC['Süper Lig']||0},{l:'Serie A',c:LC['Serie A']||0},{l:'Andorra Primera Divisió',c:LC['Andorra Primera Divisió']||0},{l:'NB I',c:LC['NB I']||0},{l:'BGL Ligue',c:LC['BGL Ligue']||0},{l:'A-League',c:LC['A-League']||0},{l:'Liga Portugal 2',c:LC['Liga Portugal 2']||0},{l:'USL Championship',c:LC['USL Championship']||0},{l:'Liga 1 Perú',c:LC['Liga 1 Perú']||0},{l:'Primera A',c:LC['Primera A']||0},{l:'Primera B',c:LC['Primera B']||0},{l:'Austrian Bundesliga',c:LC['Austrian Bundesliga']||0},{l:'Keuken Kampioen Divisie',c:LC['Keuken Kampioen Divisie']||0},{l:'Swiss Super League',c:LC['Swiss Super League']||0},{l:'Eliteserien',c:LC['Eliteserien']||0}];
    var mx=Math.max.apply(null,data.map(function(d){return d.c;}));
    el.innerHTML=data.map(function(d){
      var m=LM[d.l]||{flag:'',sh:d.l,col:'#4A5A6E'};var pct=Math.round(d.c/mx*100);
      return '<div class="hbar"><span class="hbar-lbl">'+m.flag+' '+m.sh+'</span><div class="hbar-track"><div class="hbar-fill" style="width:'+pct+'%;background:linear-gradient(90deg,'+m.col+','+m.col+'99)" data-v="'+d.c+'"></div></div><span class="hbar-n">'+d.c+'</span></div>';
    }).join('');
  }
  // FGA bands
  var el2=document.getElementById('ch-fga');
  if(el2){
    var bands=[{r:'80–100',c:FB['80-100']||0,col:'#EDB84E',l:'Elite'},{r:'60–80',c:FB['60-80']||0,col:'#22D46A',l:'Excellent'},{r:'40–60',c:FB['40-60']||0,col:'#2DD4BF',l:'Very Good'},{r:'20–40',c:FB['20-40']||0,col:'#4A7CC4',l:'Standard'},{r:'0–20',c:FB['0-20']||0,col:'#2A3A4E',l:'Developing'},{r:'—',c:FB['PENDING']||0,col:'#5A6472',l:'Pending Grading'}];
    var mx2=Math.max.apply(null,bands.map(function(b){return b.c;}));
    el2.innerHTML=bands.map(function(b){
      var pct=Math.round(b.c/mx2*100);
      return '<div class="hbar"><span class="hbar-lbl wide" style="color:'+b.col+'">'+b.r+' '+b.l+'</span><div class="hbar-track"><div class="hbar-fill" style="width:'+pct+'%;background:'+b.col+'55" data-v="'+b.c+'"></div></div><span class="hbar-n">'+b.c+'</span></div>';
    }).join('');
  }
  drawPosDonut();drawAgeBars();drawRadar();
  drawTop();drawSch();
}
function drawTop(){
  var el=document.getElementById('ch-top');if(!el)return;
  var lg=document.getElementById('top-lg').value;
  var pool=lg?P.filter(function(p){return p.l===lg;}):P;
  var top=pool.slice().sort(function(a,b){return mraw(b.fga)-mraw(a.fga);}).slice(0,10);
  el.innerHTML=top.map(function(p,i){
    var fga=p.fga,col=mcol(fga),m=LM[p.l]||{flag:'',sh:''};
    return '<div class="toprow">'+
      '<span class="tr-rank'+(i<3?' g':'')+'">'+( i+1)+'</span>'+
      '<div style="flex:1;overflow:hidden"><div class="tr-name">'+p.n+'</div><div class="tr-meta">'+(p.sq||'—')+' · '+m.flag+' '+m.sh+'</div></div>'+
      '<span class="pos-chip '+p.pos+'" style="flex-shrink:0">'+p.pos+'</span>'+
      '<span class="tr-fga" style="color:'+col+'">'+mtxt(fga,2)+'</span>'+
    '</div>';
  }).join('');
}
function svgDonut(segments,size){
  size=size||120;
  var total=segments.reduce(function(s,d){return s+d.val;},0)||1;
  var r=size/2-14,cx=size/2,cy=size/2,circ=2*Math.PI*r,sw=16;
  var offset=0,paths='';
  segments.forEach(function(seg){
    if(seg.val<=0)return;
    var frac=seg.val/total,len=frac*circ;
    paths+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+seg.col+'" stroke-width="'+sw+'" stroke-dasharray="'+len.toFixed(2)+' '+(circ-len).toFixed(2)+'" stroke-dashoffset="'+(-offset).toFixed(2)+'" transform="rotate(-90 '+cx+' '+cy+')" opacity=".9" stroke-linecap="butt"/>';
    offset+=len;
  });
  return '<svg viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'" style="flex-shrink:0">'+paths+
    '<text x="'+cx+'" y="'+(cy-3)+'" text-anchor="middle" font-family="var(--M)" font-size="17" fill="var(--t1)">'+total.toLocaleString()+'</text>'+
    '<text x="'+cx+'" y="'+(cy+12)+'" text-anchor="middle" font-family="var(--D)" font-size="7" letter-spacing="1" fill="var(--t3)">TOTAL</text>'+
  '</svg>';
}
function svgRadar(axes,size){
  size=size||210;
  var cx=size/2,cy=size/2-6,r=size/2-42,n=axes.length;
  var grid='';
  [0.25,0.5,0.75,1].forEach(function(ring){
    var pts=axes.map(function(a,i){
      var ang=-90+i*(360/n),rad=ang*Math.PI/180;
      return (cx+r*ring*Math.cos(rad)).toFixed(1)+','+(cy+r*ring*Math.sin(rad)).toFixed(1);
    }).join(' ');
    grid+='<polygon points="'+pts+'" fill="none" stroke="var(--ln2)" stroke-width="1"/>';
  });
  axes.forEach(function(a,i){
    var ang=-90+i*(360/n),rad=ang*Math.PI/180;
    var x=(cx+r*Math.cos(rad)).toFixed(1),y=(cy+r*Math.sin(rad)).toFixed(1);
    grid+='<line x1="'+cx+'" y1="'+cy+'" x2="'+x+'" y2="'+y+'" stroke="var(--ln2)" stroke-width="1"/>';
  });
  var dpts=axes.map(function(a,i){
    var ang=-90+i*(360/n),rad=ang*Math.PI/180,v=Math.max(0,Math.min(1,a.val/100));
    return (cx+r*v*Math.cos(rad)).toFixed(1)+','+(cy+r*v*Math.sin(rad)).toFixed(1);
  }).join(' ');
  var poly='<polygon points="'+dpts+'" fill="var(--gold)" fill-opacity=".22" stroke="var(--gold2)" stroke-width="2"/>';
  var dots=axes.map(function(a,i){
    var ang=-90+i*(360/n),rad=ang*Math.PI/180,v=Math.max(0,Math.min(1,a.val/100));
    var x=(cx+r*v*Math.cos(rad)).toFixed(1),y=(cy+r*v*Math.sin(rad)).toFixed(1);
    return '<circle cx="'+x+'" cy="'+y+'" r="3" fill="var(--gold2)"/>';
  }).join('');
  var labels=axes.map(function(a,i){
    var ang=-90+i*(360/n),rad=ang*Math.PI/180,lr=r+16;
    var x=(cx+lr*Math.cos(rad)).toFixed(1),y=(cy+lr*Math.sin(rad)).toFixed(1);
    var cosv=Math.cos(rad),anchor=cosv>0.3?'start':(cosv<-0.3?'end':'middle');
    return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-family="var(--D)" font-size="10" fill="var(--t2)">'+a.label+'</text>'+
           '<text x="'+x+'" y="'+(parseFloat(y)+11)+'" text-anchor="'+anchor+'" font-family="var(--M)" font-size="9" fill="var(--gold2)">'+a.val.toFixed(1)+'</text>';
  }).join('');
  return '<svg viewBox="0 0 '+size+' '+size+'" width="100%" height="'+(size-10)+'">'+grid+poly+dots+labels+'</svg>';
}
function svgBarChart(data,w,h,cols){
  w=w||280;h=h||160;
  var topPad=24,botPad=28;
  var mx=Math.max.apply(null,data.map(function(d){return d.val;}))||1;
  var n=data.length,gap=8,bw=(w-gap*(n+1))/n;
  var bars='',labels='';
  data.forEach(function(d,i){
    var bh=(d.val/mx)*(h-topPad-botPad);
    var x=gap+i*(bw+gap),y=h-botPad-bh;
    bars+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(bh,1).toFixed(1)+'" rx="2" fill="'+(cols[i]||'var(--gold)')+'" opacity=".85"/>';
    bars+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(y-7).toFixed(1)+'" text-anchor="middle" font-family="var(--M)" font-size="11" fill="var(--t1)">'+d.val.toLocaleString()+'</text>';
    labels+='<text x="'+(x+bw/2).toFixed(1)+'" y="'+(h-10)+'" text-anchor="middle" font-family="var(--D)" font-size="8.5" fill="var(--t2)">'+d.label+'</text>';
  });
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'">'+bars+labels+'</svg>';
}
function drawPosDonut(){
  var el=document.getElementById('ch-posdonut');if(!el)return;
  var segs=['GK','DF','MF','FW'].map(function(pos){return {label:pos,val:PC[pos]||0,col:POS_COLORS[pos]};});
  var total=segs.reduce(function(a,b){return a+b.val;},0)||1;
  var legend=segs.map(function(s){
    var pct=Math.round(s.val/total*100);
    return '<div class="hbar"><span class="hbar-lbl" style="color:'+s.col+'">'+s.label+'</span><div class="hbar-track"><div class="hbar-fill" style="width:'+pct+'%;background:'+s.col+'66" data-v="'+s.val+' ('+pct+'%)"></div></div></div>';
  }).join('');
  el.innerHTML='<div style="display:flex;align-items:center;gap:12px"><div>'+svgDonut(segs,110)+'</div><div style="flex:1;min-width:0">'+legend+'</div></div>';
}
function drawAgeBars(){
  var el=document.getElementById('ch-age');if(!el)return;
  var acols=['#3B82F6','#22C55E','#F59E0B','#EF4444','#9B59B6'];
  var akeys=['U21','21-25','26-30','31-35','35+'];
  var data=akeys.map(function(k){return {label:k,val:AG[k]||0};});
  el.innerHTML=svgBarChart(data,290,165,acols);
}
function drawRadar(){
  var el=document.getElementById('ch-radar');if(!el)return;
  var sel=document.getElementById('radar-lg'),lg=sel?sel.value:'';
  var pool=lg?P.filter(function(p){return p.l===lg;}):P;
  var keys=[{k:'cci',label:'CCI'},{k:'clu',label:'CLU'},{k:'har',label:'HAR'},{k:'thi',label:'THI'},{k:'ult',label:'ULT'}];
  var sampleN=0;
  var axes=keys.map(function(o){
    var vals=pool.map(function(p){return p[o.k];}).filter(function(v){return v!=null;});
    sampleN=Math.max(sampleN,vals.length);
    var avg=vals.length?vals.reduce(function(a,b){return a+b;},0)/vals.length:0;
    return {label:o.label,val:avg};
  });
  el.innerHTML=sampleN>0?svgRadar(axes,210):'<div class="empty" style="padding:20px 0"><div class="empty-m" style="font-size:.7rem">No graded players'+(lg?' in '+lg:'')+'</div></div>';
  var note=document.getElementById('ch-radar-note');
  if(note)note.textContent=sampleN>0?('Avg. across '+sampleN.toLocaleString()+' graded players'+(lg?' in '+lg:' · platform-wide')+' · 0\u2013100 scale'):'';
}
function drawSch(){
  var el=document.getElementById('ch-sch');if(!el)return;
  var top=SD.slice(0,8);
  var restCount=SD.slice(8).reduce(function(s,d){return s+d.c;},0);
  var segs=top.map(function(d){return {label:d.n.replace(' School','').replace(' Masters',''),val:d.c,col:SC[d.n]||'#4A5A6E'};});
  if(restCount>0)segs.push({label:'Other',val:restCount,col:'#3A4A5E'});
  var total=segs.reduce(function(a,b){return a+b.val;},0)||1;
  var legend=segs.map(function(s){
    var pct=Math.round(s.val/total*100);
    return '<div class="hbar"><span class="hbar-lbl wide" style="color:'+s.col+';font-size:.6rem">'+s.label+'</span><div class="hbar-track"><div class="hbar-fill" style="width:'+pct+'%;background:'+s.col+'66" data-v="'+s.val+'"></div></div></div>';
  }).join('');
  el.innerHTML='<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><div>'+svgDonut(segs,100)+'</div><div style="flex:1;min-width:150px">'+legend+'</div></div>';
}

// METRICS
var metricsR=false;
var MDAT=[
  {t:'T1',c:'XPS',n:'Expected Performance Score',d:'Goals×2.5 + SoT×0.6 + shots×0.4 + assists×1.2. Core attacking contribution.'},
  {t:'T1',c:'STK',n:'Striker Killer',d:'Shot quality, conversion rate, goals per 90. Peak finishing efficiency.'},
  {t:'T1',c:'RDS',n:'Renard des Surfaces',d:'Penalty box instinct: conversion rate, positional scoring goals.'},
  {t:'T1',c:'KEY',n:'Key Pass Index',d:'Chance creation: assists weighted by frequency and quality.'},
  {t:'T1',c:'LGP',n:'Long Game Progression',d:'Vertical delivery: crosses + progressive passes per 90.'},
  {t:'T1',c:'VRP',n:'Vertical Penetration',d:'Forward impact: goals+assists per 90 with shot accuracy bonus.'},
  {t:'T1',c:'HZP',n:'Horizontal Play',d:'Width exploitation: crosses per 90 + fouls won as width proxy.'},
  {t:'T1',c:'UNP',n:'Under Pressure Pass',d:'Distribution under pressure: accuracy in defensive zones.'},
  {t:'T1',c:'DGP',n:'Diagonal Pass Score',d:'Diagonal ball delivery from deep and wide positions.'},
  {t:'T1',c:'MRK',n:'Marking Intelligence',d:'Opponent suppression: interceptions per 90, offside forced.'},
  {t:'T1',c:'TAC',n:'Tackle Score',d:'Ball-winning efficiency: successful tackles weighted by frequency.'},
  {t:'T1',c:'INT',n:'Interception Score',d:'Reading the game: interceptions volume and rate per 90.'},
  {t:'T1',c:'CLE',n:'Clearance Score',d:'Defensive clearances — headed clearances per 90, feet clearances, aerial duels won, defensive line positioning.'},
  {t:'T1',c:'BLO',n:'Block Score',d:'Physical intervention: shot-stopping + pass-blocking composite.'},
  {t:'T1',c:'CAR',n:'Carrying Score',d:'Ball progression: G+A per 90, fouls won as dribble proxy.'},
  {t:'T1',c:'DRB',n:'Dribble Score',d:'1v1 quality: fouls won per 90, direct dribble completion rate.'},
  {t:'T1',c:'SAV',n:'Save Performance',d:'GK: save percentage benchmarked vs league average.'},
  {t:'T1',c:'DSW',n:'Distribution Width',d:'GK passing range and distribution quality — launch distance, passing to wide areas, ball distribution accuracy.'},
  {t:'T1',c:'POS',n:'Positioning Score',d:'GK: clean sheet percentage as positional discipline proxy.'},
  {t:'T1',c:'ONE',n:'One-on-One Save',d:'GK 1v1 performance — save percentage on low-angle shots, PSxG+/- on breakaways, 1v1 situations handled.'},
  {t:'T1',c:'KIC',n:'Kickout Quality',d:'GK distribution: minutes-based reliability and launch proxy.'},
  {t:'T2',c:'POI',n:'Position Intelligence',d:'4-component composite: DMA + UNP + SPI + RDS.'},
  {t:'T2',c:'CPX',n:'Composure Index',d:'4-component: progressive contribution + dribble calmness + vision + risk.'},
  {t:'T2',c:'MOB',n:'Mobility Rating',d:'4-component: distance + high-speed actions + acceleration + decisions.'},
  {t:'T2',c:'PVI',n:'Pass Variety Index',d:'4-component equal-weighted blend: LGP + VRP + HZP + DGP.'},
  {t:'T2',c:'CPI',n:'Creative Player Index',d:'4-component: xG proxy + xA proxy + shot-creating actions + key pass quality.'},
  {t:'T2',c:'GKI',n:'Goalkeeper Intelligence',d:'4-component GK: shot-stop 35% + distribution 20% + command 30% + morale 15%.'},
  {t:'T3',c:'DMA',n:'Decision Making',d:'Expert: G+A efficiency under pressure vs card discipline.'},
  {t:'T3',c:'CHR',n:'Character Score',d:'Expert: consistency, fouls won vs committed ratio, team points impact.'},
  {t:'T3',c:'MCS',n:'Mental Competence',d:'Expert: +/- contribution, goal involvement, team performance correlation.'},
  {t:'T3',c:'SOA',n:'Speed on Action',d:'Expert: shots + fouls won per 90 as proactivity and burst proxy.'},
  {t:'T3',c:'SPI',n:'Spatial Performance',d:'Expert: cross + interception + tackle spatial variety composite.'},
  {t:'T3',c:'CLM',n:'Calmness Rating',d:'Expert: low card count + composure under pressure + delivery quality.'},
  {t:'T3',c:'CRS',n:'Clutch Response',d:'Expert: goals + assists per 90 in critical and high-stakes matches.'},
  {t:'T3',c:'OMS',n:'Omschakeling (Transition)',d:'Expert: transition speed — assists + interceptions + shots per 90.'},
  {t:'T3',c:'SPR',n:'Sprint Performance',d:'Expert: shots + tackles + fouls won per 90 as intensity proxy.'},
  {t:'T3',c:'DYN',n:'Dynamism',d:'Expert: G+A + crosses + fouls won per 90 as energy composite.'},
  {t:'T3',c:'CRK',n:'Creative Risk Taking',d:'Expert: G/Sh efficiency + dribbling + creative index blend.'},
];
function renderMetrics(){
  if(metricsR)return;metricsR=true;
  var w=document.getElementById('mwrap');if(!w)return;
  var tiers=[
    {k:'T1',lbl:'Tier 1 — Base Metrics',sub:'21 metrics · 60% Automated · FBref + Sofascore',cls:'t1c',span:2},
    {k:'T2',lbl:'Tier 2 — Composite Intelligence',sub:'6 metrics · 30% Semi-Automated · Multi-factor',cls:'t2c',span:1},
    {k:'T3',lbl:'Tier 3 — Scout Intelligence',sub:'11 metrics · 10% Manual · Expert assessment',cls:'t3c',span:1},
  ];
  w.innerHTML=tiers.map(function(t){
    var items=MDAT.filter(function(m){return m.t===t.k;});
    return '<div class="mpanel" style="grid-column:span '+t.span+'">'+
      '<div class="mptitle"><span>'+t.lbl+'</span><span class="mpcnt">'+items.length+'</span></div>'+
      '<div class="mpsub">'+t.sub+'</div>'+
      items.map(function(m){
        return '<div class="mrow"><span class="mcode">'+m.c+'</span><div class="mtext"><div class="mname">'+m.n+'</div><div class="mdesc">'+m.d+'</div></div><span class="mtier '+t.cls+'">'+m.t+'</span></div>';
      }).join('')+
    '</div>';
  }).join('');
}

// PHILOSOPHIES
var PH=[
  {s:'Dutch School',m:'Cruyff',d:'Total Football — spatial genius, positional fluidity',w:1.45},
  {s:'Dutch School',m:'Michels',d:'Total Football foundation — pressing, collective genius',w:1.18},
  {s:'Dutch School',m:'Van Gaal',d:'Systematic positional play — disciplined structure',w:1.22},
  {s:'Dutch School',m:'Kovacs',d:'Ajax continuation — technical passing, dynamic movement',w:1.26},
  {s:'Dutch School',m:'Hiddink',d:'Cultural mastery — adaptive tactics, international versatility',w:1.30},
  {s:'Dutch School',m:'Beenhakker',d:'Global success — tactical flexibility, man-management',w:1.28},
  {s:'Spanish School',m:'Guardiola',d:'Positional superiority — tiki-taka, high press, spatial control',w:1.38},
  {s:'Spanish School',m:'Carniglia',d:'European elegance — Real Madrid attacking style',w:1.31},
  {s:'Spanish School',m:'Munoz',d:'Real Madrid sophistication — attacking brilliance',w:1.35},
  {s:'Spanish School',m:'Aragones',d:'Spanish identity — technical base, tactical revolution',w:1.31},
  {s:'Spanish School',m:'Villalonga',d:'Systematic excellence — organized structure and methodology',w:1.12},
  {s:'Spanish School',m:'Emery',d:'Tournament mastery — Europa DNA, pressing intensity',w:1.24},
  {s:'Spanish School',m:'Pellegrini',d:'South American sophistication — elegant passing football',w:1.22},
  {s:'Italian School',m:'Herrera',d:'Defensive mastery — catenaccio, counter-attack precision',w:1.30},
  {s:'Italian School',m:'Rocco',d:'Systematic defense — compact shape, physical intensity',w:1.29},
  {s:'Italian School',m:'Bearzot',d:'National team pragmatism — collective unity above all',w:1.33},
  {s:'Italian School',m:'Lippi',d:'Modern Italian elegance — technical quality meets solidity',w:1.29},
  {s:'Italian School',m:'Sacchi',d:'High pressing revolution — zonal marking, team as unit',w:1.32},
  {s:'Italian School',m:'Trapattoni',d:'Tactical perfection — defensive organisation mastery',w:1.26},
  {s:'Italian School',m:'Carcano',d:'Italian football birth — foundational historical principles',w:1.19},
  {s:'Italian School',m:'Cesarini',d:'La Maquina — Argentine creative genius in Italian football',w:1.22},
  {s:'English School',m:'Ferguson',d:'Winning mentality — mental strength, never-say-die spirit',w:1.28},
  {s:'English School',m:'Busby',d:'Youth integration — developing raw talent into champions',w:1.34},
  {s:'English School',m:'Robson',d:'Box-to-box football — passion, physicality, English heart',w:1.36},
  {s:'English School',m:'Venables',d:'English sophistication — tactical creativity and structure',w:1.29},
  {s:'English School',m:'Winterbottom',d:'Coaching education — foundational English methodology',w:1.28},
  {s:'English School',m:'Shankly',d:'Emotional leadership — passion, pressing, collective identity',w:1.18},
  {s:'English School',m:'Clough',d:'Mental mastery — player psychology, unconventional genius',w:1.35},
  {s:'English School',m:'Paisley',d:'Liverpool tradition — collective wisdom, team continuity',w:1.24},
  {s:'German School',m:'Heynckes',d:'German efficiency — high press, clinical finishing',w:1.25},
  {s:'German School',m:'Cramer',d:'Methodical precision — structured systematic training',w:1.24},
  {s:'German School',m:'Hitzfeld',d:'Adaptive mastery — flexible systems, tournament excellence',w:1.21},
  {s:'German School',m:'Happel',d:'Zonal marking pioneer — defensive organization, tactical discipline',w:1.23},
  {s:'German School',m:'Herberger',d:'German method — systematic preparation, collective strength',w:1.17},
  {s:'German School',m:'Beckenbauer',d:'Libero revolution — attacking defender, positional freedom',w:1.15},
  {s:'French School',m:'Wenger',d:'Development philosophy — technical excellence and youth',w:1.27},
  {s:'French School',m:'Suaudeau',d:'Technical flair — creative freedom and attacking expression',w:1.30},
  {s:'French School',m:'Platini',d:'Midfield elegance — passing range, leadership, vision',w:1.35},
  {s:'French School',m:'Fontaine',d:'Clinical finishing — attacking positioning, goal instinct',w:1.33},
  {s:'French School',m:'Deschamps',d:'Tactical pragmatism — leadership, balance, collective strength',w:1.28},
      {s:'South American School',m:'Santana',d:'Jogo Bonito — pure beautiful football, creative freedom',w:1.18},
  {s:'South American School',m:'Zagallo',d:'Tactical evolution — adapting Brazilian brilliance',w:1.22},
  {s:'South American School',m:'Feola',d:'Organisational excellence — 1958 World Cup system',w:1.16},
  {s:'South American School',m:'Menotti',d:'Argentine artistry — beautiful football, left-wing philosophy',w:1.35},
  {s:'South American School',m:'Bilardo',d:'Argentine pragmatism — results first, 1986 discipline',w:1.28},
  {s:'South American School',m:'Bielsa',d:'Bielsismo — high-intensity pressing, positional obsession',w:1.31},
  {s:'South American School',m:'Simeone',d:'Cholismo — defensive passion, collective intensity',w:1.25},
    {s:'Hungarian School',m:'Czeizler',d:'Technical method — Hungarian precision, structured passing',w:1.33},
  {s:'Hungarian School',m:'Sebes',d:'Hungarian revolution — 1950s total football precursor',w:1.15},
  {s:'Scandinavian Masters',m:'Liedholm',d:'Swedish-Italian fusion — Scandinavian intelligence and rigour',w:1.31},
  {s:'Belgian Masters',m:'Goethals',d:'Belgian excellence — Anderlecht and Brugge European DNA',w:1.26},
  {s:'Eastern European School',m:'Osim',d:'Football intelligence — intelligent movement and awareness',w:1.29},
  {s:'Eastern European School',m:'Lobanovskyi',d:'Scientific football — data-driven, functional fitness',w:1.18},
  {s:'Eastern European School',m:'Petru',d:'Technical discipline — precision passing and structure',w:1.26},
  {s:'Eastern European School',m:'Penev',d:'Bulgarian revolution — creative individuality, dynamic movement',w:1.24},
  {s:'Global Masters',m:'Milutinovic',d:'Football globalisation — cultural adaptation and mastery',w:1.27},
    {s:'Global Masters',m:'Ranieri',d:'Collective miracle — team spirit, believe against all odds',w:1.31},
  {s:'Football Genesis',m:'Suppici',d:'Football genesis — foundational principles of the game',w:1.31},
  {s:'Modern Masters',m:'Mourinho',d:'Tactical warfare — defensive masterclass and psychology',w:1.22},
  {s:'Modern Masters',m:'Klopp',d:'Heavy metal football — gegenpressing, verticality, emotional energy',w:1.33},
  {s:'Modern Masters',m:'Ancelotti',d:'Adaptive excellence — situational mastery, star management',w:1.30},
  {s:'Modern Masters',m:'Conte',d:'Intense organisation — 3-at-back, tactical work, winning mentality',w:1.29},
  {s:'Modern Masters',m:'Tuchel',d:'Positional structure — build-up mastery, defensive solidity',w:1.28},
  {s:'Modern Masters',m:'Pochettino',d:'Physical fitness — pressing, youth development, high intensity',w:1.27},
  {s:'Modern Masters',m:'Nagelsmann',d:'Tactical innovation — formations, adaptability, modern systems',w:1.26},
  {s:'Modern Masters',m:'Flick',d:'High tempo — positional play, team ethic, German efficiency',w:1.25},
  {s:'Modern Masters',m:'DeVisser',d:'Scouting revolution — global talent identification and raw potential',w:1.15},
    ];
var activeS='',philR=false;
function renderPhil(){
  var pills=document.getElementById('spills'),grid=document.getElementById('philgrid');
  if(!pills||!grid)return;
  if(!philR){
    philR=true;
    var schools=[];PH.forEach(function(p){if(schools.indexOf(p.s)<0)schools.push(p.s);});
    pills.innerHTML='<button class="spill on" onclick="filterSch(\'\')">All</button>'+
      schools.map(function(s){
        var col=SC[s]||'#4A5A6E';
        return '<button class="spill" onclick="filterSch(\''+s.replace(/'/g,"\\'")+'\''+')" style="border-color:'+col+'55;color:'+col+'" data-s="'+s+'">'
          +s.replace(' School','').replace(' Masters','')+'</button>';
      }).join('');
  }
  var list=activeS?PH.filter(function(p){return p.s===activeS;}):PH;
  var cols=Math.min(list.length,activeS?4:5);
  grid.style.gridTemplateColumns='repeat('+cols+',1fr)';
  grid.innerHTML=list.map(function(p){
    var col=SC[p.s]||'#4A5A6E';
    var cnt=P.filter(function(pl){return pl.mgr===p.m;}).length;
    return '<div class="pcard" style="border-color:'+col+'33">'+
      '<div class="psch" style="color:'+col+'">'+p.s+'</div>'+
      '<div class="pmgr">'+p.m+'</div>'+
      '<div class="pdna">'+p.d+'</div>'+
      '<div class="pfoot"><span class="pw">'+(p.w||0).toFixed(2)+'</span><span>'+cnt+' players</span></div>'+
    '</div>';
  }).join('');
}
function filterSch(s){
  activeS=s;
  document.querySelectorAll('.spill').forEach(function(b){b.classList.remove('on');});
  if(!s){var f=document.querySelector('.spill');if(f)f.classList.add('on');}
  else{var b=document.querySelector('[data-s="'+s+'"]');if(b)b.classList.add('on');}
  renderPhil();
}


var HD_MAP={"Andorra": "Europe", "Argentina": "South America", "Australia": "Oceania", "Austria": "Europe", "Belgium": "Europe", "Bolivia": "South America", "Brazil": "South America", "Bulgaria": "Europe", "Canada": "North America", "Chile": "South America", "Colombia": "South America", "Croatia": "Europe", "Czech Republic": "Europe", "Denmark": "Europe", "Ecuador": "South America", "England": "Europe", "France": "Europe", "Germany": "Europe", "Greece": "Europe", "Hungary": "Europe", "Iran": "Asia", "Italy": "Europe", "Japan": "Asia", "Kazakhstan": "Europe", "Luxembourg": "Europe", "Mexico": "North America", "Netherlands": "Europe", "Norway": "Europe", "Paraguay": "South America", "Peru": "South America", "Poland": "Europe", "Portugal": "Europe", "Romania": "Europe", "Saudi Arabia": "Asia", "Scotland": "Europe", "Slovenia": "Europe", "South Africa": "Africa", "South Korea": "Asia", "Spain": "Europe", "Switzerland": "Europe", "Turkey": "Europe", "USA": "North America", "United States": "North America", "Uruguay": "South America", "Venezuela": "South America"};
var HD_LBL={"total": "Total Players", "leagues": "Leagues", "countries": "Countries", "continents": "Continents", "players": "players", "league1": "league", "leagueN": "leagues", "countryWord": "countries", "leagueWord": "leagues"};
var HD_CNAMES={"Europe": "Europe", "South America": "South America", "North America": "North America", "Asia": "Asia", "Africa": "Africa", "Oceania": "Oceania", "Other": "Other"};
function hdEsc(s){return String(s).replace(/'/g,"\\'");}
function hdToggleCont(el){el.parentElement.classList.toggle('open');}
function hdToggleCountry(el){el.classList.toggle('open');}
function hdScrollTo(cont){
  var el=document.querySelector('.hd-continent[data-cont="'+cont+'"]');
  if(!el)return;
  el.classList.add('open');
  el.scrollIntoView({behavior:'smooth',block:'start'});
}
function renderHierDash(){
  var root=document.getElementById('hierDash');
  if(!root||typeof P==='undefined')return;
  var data={};
  P.forEach(function(p){
    var c=p.c||'Other', l=p.l||'Other', s=p.season||'\u2014', f=p.f||'';
    var cont=HD_MAP[c]||'Other';
    if(!data[cont])data[cont]={total:0,countries:{}};
    data[cont].total++;
    var cd=data[cont].countries;
    if(!cd[c])cd[c]={total:0,flag:f,leagues:{}};
    cd[c].total++;
    if(f)cd[c].flag=f;
    var ld=cd[c].leagues;
    if(!ld[l])ld[l]={total:0,seasons:{}};
    ld[l].total++;
    ld[l].seasons[s]=(ld[l].seasons[s]||0)+1;
  });
  var contKeys=Object.keys(data).sort(function(a,b){return data[b].total-data[a].total;});
  var totalLeagues=0, totalCountries=0;
  contKeys.forEach(function(k){
    var ck=Object.keys(data[k].countries);
    totalCountries+=ck.length;
    ck.forEach(function(cc){totalLeagues+=Object.keys(data[k].countries[cc].leagues).length;});
  });
  var statsHtml='<div class="hd-stats">'+
      '<div class="hd-stat"><div class="hd-stat-val">'+P.length.toLocaleString()+'</div><div class="hd-stat-lbl">'+HD_LBL.total+'</div></div>'+
      '<div class="hd-stat"><div class="hd-stat-val">'+totalLeagues+'</div><div class="hd-stat-lbl">'+HD_LBL.leagues+'</div></div>'+
      '<div class="hd-stat"><div class="hd-stat-val">'+totalCountries+'</div><div class="hd-stat-lbl">'+HD_LBL.countries+'</div></div>'+
      '<div class="hd-stat"><div class="hd-stat-val">'+contKeys.length+'</div><div class="hd-stat-lbl">'+HD_LBL.continents+'</div></div>'+
    '</div>';
  var pillsHtml='<div class="hd-pillrow">'+contKeys.map(function(k){
    return '<button class="hd-pill" onclick="hdScrollTo(\''+hdEsc(k)+'\')">'+(HD_CNAMES[k]||k)+' \u00b7 '+data[k].total.toLocaleString()+'</button>';
  }).join('')+'</div>';
  var contHtml=contKeys.map(function(cont,idx){
    var cd=data[cont].countries;
    var countryKeys=Object.keys(cd).sort(function(a,b){return cd[b].total-cd[a].total;});
    var leagueCount=0; countryKeys.forEach(function(cc){leagueCount+=Object.keys(cd[cc].leagues).length;});
    var countriesHtml=countryKeys.map(function(cname){
      var country=cd[cname];
      var leagueKeys=Object.keys(country.leagues).sort(function(a,b){return country.leagues[b].total-country.leagues[a].total;});
      var leagueCardsHtml=leagueKeys.map(function(lname){
        var lg=country.leagues[lname];
        var seasonKeys=Object.keys(lg.seasons).sort(function(a,b){return lg.seasons[b]-lg.seasons[a];});
        var pills=seasonKeys.map(function(s){return '<span class="hd-season-pill">'+s+' \u00b7 '+lg.seasons[s]+'</span>';}).join('');
        return '<div class="hd-league-card" onclick="event.stopPropagation();goToLeague(\''+hdEsc(lname)+'\')">'+
          '<div class="hd-league-top"><span class="hd-league-name">'+lname+'</span><span class="hd-league-total">'+lg.total+'</span></div>'+
          '<div class="hd-season-pills">'+pills+'</div>'+
        '</div>';
      }).join('');
      var lcount=leagueKeys.length;
      return '<div class="hd-country" onclick="hdToggleCountry(this)">'+
        '<div class="hd-country-top"><span class="hd-flag">'+(country.flag||'')+'</span><span class="hd-country-name">'+cname+'</span></div>'+
        '<div class="hd-country-stats"><strong>'+country.total.toLocaleString()+'</strong> '+HD_LBL.players+' \u00b7 '+lcount+' '+(lcount>1?HD_LBL.leagueN:HD_LBL.league1)+'</div>'+
        '<div class="hd-league-panel">'+leagueCardsHtml+'</div>'+
      '</div>';
    }).join('');
    return '<div class="hd-continent'+(idx===0?' open':'')+'" data-cont="'+hdEsc(cont)+'">'+
      '<div class="hd-cont-head" onclick="hdToggleCont(this)">'+
        '<span class="hd-cont-name">'+(HD_CNAMES[cont]||cont)+'</span>'+
        '<span class="hd-cont-meta">'+countryKeys.length+' '+HD_LBL.countryWord+' \u00b7 '+leagueCount+' '+HD_LBL.leagueWord+' \u00b7 <strong>'+data[cont].total.toLocaleString()+'</strong> '+HD_LBL.players+'</span>'+
        '<span class="hd-chevron">\u25be</span>'+
      '</div>'+
      '<div class="hd-cont-body"><div class="hd-country-grid">'+countriesHtml+'</div></div>'+
    '</div>';
  }).join('');
  root.innerHTML=statsHtml+pillsHtml+contHtml;
}

// INIT — wires up filter dropdowns, event listeners, and dashboard charts on load
populateLeagueDropdowns();
initF();
updClubs();
initScoutF();
drawCharts();
renderHierDash();
