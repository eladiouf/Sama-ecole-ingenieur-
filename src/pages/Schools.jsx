import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Target, Briefcase, AlertTriangle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const schoolsData = [
  {
    id: 'esp',
    name: "ESP (École Supérieure Polytechnique)",
    location: "Dakar",
    description: "L'une des écoles d'ingénieurs les plus anciennes et prestigieuses du Sénégal, située à l'UCAD.",
    filieres: ["Génie Informatique", "Génie Électrique", "Génie Mécanique", "Génie Civil", "Génie Chimique et Biologie Appliquée"],
    avantages: ["Immense réseau d'alumni", "Laboratoires très bien équipés", "Position centrale à Dakar"],
    inconvenients: ["Extrêmement sélectif", "Effectifs parfois importants en cycle de base"],
    debouches: ["Développement Logiciel", "Systèmes Embarqués", "Industrie Énergétique", "Direction Technique (CTO)"]
  },
  {
    id: 'ept',
    name: "EPT (École Polytechnique de Thiès)",
    location: "Thiès",
    description: "École d'excellence fonctionnant sous le régime de l'internat (militaire/civil) pour une formation rigoureuse.",
    filieres: ["Génie Civil", "Génie Électromécanique", "Génie Aéronautique"],
    avantages: ["Régime d'internat favorisant la concentration", "Forte cohésion (esprit de corps)", "Taux d'insertion professionnel très élevé"],
    inconvenients: ["Discipline stricte", "Éloignement de la capitale pour certains"],
    debouches: ["Chefs de grands chantiers BTP", "Ingénierie Aéronautique", "Maintenance Industrielle"]
  },
  {
    id: 'ipsl',
    name: "IPSL (Institut Polytechnique de Saint-Louis)",
    location: "Saint-Louis",
    description: "L'institut d'ingénieurs de l'Université Gaston Berger (UGB), reconnu pour sa rigueur scientifique.",
    filieres: ["Génie Civil", "Génie Électromécanique", "Génie Informatique et Télécoms"],
    avantages: ["Cadre d'études exceptionnel de l'UGB", "Formation alignée sur les standards internationaux"],
    inconvenients: ["Éloignement géographique par rapport aux hubs industriels de Dakar"],
    debouches: ["Télécommunications", "Réseaux et Sécurité", "Infrastructures Civiles"]
  },
  {
    id: 'ufr-si',
    name: "UFR Sciences de l'Ingénieur (UIDT)",
    location: "Thiès",
    description: "Composante de l'Université Iba Der Thiam, focalisée sur les ingénieries de pointe.",
    filieres: ["Génie Géomatique", "Génie Civil", "Génie Électrique"],
    avantages: ["Filières rares comme la géomatique", "Soutien fort de l'UIDT"],
    inconvenients: ["Infrastructures en cours de développement comparées aux écoles historiques"],
    debouches: ["Systèmes d'Information Géographique (SIG)", "Topographie", "Réseaux Électriques"]
  },
  {
    id: 'ensa',
    name: "ENSA (École Nationale Supérieure d'Agriculture)",
    location: "Thiès",
    description: "La référence nationale pour la formation des ingénieurs agronomes.",
    filieres: ["Production Végétale", "Production Animale", "Économie Rurale", "Génie Rural"],
    avantages: ["Monopole quasi-total sur l'expertise agronomique d'État", "Secteur en forte demande"],
    inconvenients: ["Spécialisation très ciblée qui limite les pivots de carrière"],
    debouches: ["Agro-industrie", "Directions Ministérielles (Agriculture)", "Gestion d'exploitations"]
  },
  {
    id: 'ensmg',
    name: "ENSMG (Mines et Géologie)",
    location: "Dakar",
    description: "Anciennement Institut des Sciences de la Terre (IST), forme l'élite du secteur extractif.",
    filieres: ["Géologie de l'Ingénieur", "Mines et Carrières", "Hydrogéologie"],
    avantages: ["Secteur pétrolier et minier très porteur au Sénégal (découvertes récentes)"],
    inconvenients: ["Conditions de travail futures souvent sur le terrain en zones reculées"],
    debouches: ["Industries pétrolières (Oil & Gas)", "Exploitation Minière", "Hydraulique"]
  },
  {
    id: 'isfar',
    name: "ISFAR",
    location: "Bambey",
    description: "Institut Supérieur de Formation Agricole et Rurale (Université Alioune Diop).",
    filieres: ["Développement Rural", "Foresterie", "Agriculture"],
    avantages: ["Forte expertise pratique", "Immersion rapide dans le monde rural"],
    inconvenients: ["Moins orienté vers la haute technologie"],
    debouches: ["ONG", "Organisations de Développement", "Eaux et Forêts"]
  },
  {
    id: 'polytech-diamniadio',
    name: "Polytech Diamniadio (UAM)",
    location: "Diamniadio",
    description: "La petite dernière du réseau, située dans la nouvelle ville intelligente.",
    filieres: ["Intelligence Artificielle", "Robotique", "Systèmes Énergétiques"],
    avantages: ["Technologies émergentes exclusives", "Infrastructures neuves de l'UAM"],
    inconvenients: ["Manque de recul (réseau d'anciens naissant)"],
    debouches: ["Data Science", "Smart Cities", "Énergies Renouvelables"]
  }
];

export default function Schools() {
  const [openId, setOpenId] = useState(schoolsData[0].id);

  return (
    <div className="min-h-screen bg-[#F0EFF4] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#7B61FF] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#7B61FF] tracking-wider uppercase">Le Réseau REPFIS</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-7xl text-[#18181B] mb-6">
            Les 8 Écoles <br/> d'Excellence.
          </h1>
          <p className="text-lg text-[#18181B]/70 max-w-2xl">
            Un seul concours commun vous ouvre les portes de ces établissements publics prestigieux. Explorez leurs filières et spécificités pour faire le meilleur choix.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {schoolsData.map((school, index) => {
            const isOpen = openId === school.id;

            return (
              <React.Fragment key={school.id}>
                <div 
                  className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#7B61FF]/30 shadow-xl shadow-[#7B61FF]/5' : 'border-[#18181B]/10 hover:border-[#18181B]/20'
                }`}
              >
                {/* Header (Clickable) */}
                <button 
                  className="w-full text-left px-8 py-6 flex items-center justify-between"
                  onClick={() => setOpenId(isOpen ? null : school.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <h2 className={`text-2xl font-semibold transition-colors ${isOpen ? 'text-[#7B61FF]' : 'text-[#18181B]'}`}>
                      {school.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs font-data font-medium text-[#18181B]/50 bg-[#F0EFF4] px-3 py-1 rounded-full w-fit">
                      <MapPin size={12} /> {school.location}
                    </div>
                  </div>
                  <div className={`p-2 rounded-full bg-[#F0EFF4] text-[#18181B] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#7B61FF] text-white' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {/* Content (Expandable) */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-[#18181B]/70 mb-8">{school.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-[#7B61FF] mb-3">
                          <Target size={18} />
                          <h4 className="font-semibold text-sm uppercase tracking-wide">Filières</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {school.filieres.map(f => (
                            <span key={f} className="text-xs font-data bg-[#18181B] text-[#F0EFF4] px-3 py-1.5 rounded-lg">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#7B61FF] mb-3">
                          <Briefcase size={18} />
                          <h4 className="font-semibold text-sm uppercase tracking-wide">Débouchés</h4>
                        </div>
                        <ul className="space-y-2">
                          {school.debouches.map(d => (
                            <li key={d} className="text-sm text-[#18181B]/80 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]/50"></div>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-[#F0EFF4] p-5 rounded-2xl">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-[#18181B]">
                          <span className="text-green-600">+</span> Avantages
                        </h4>
                        <ul className="space-y-2">
                          {school.avantages.map(a => (
                            <li key={a} className="text-sm text-[#18181B]/70">{a}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#F0EFF4] p-5 rounded-2xl">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-[#18181B]">
                          <AlertTriangle size={14} className="text-amber-500" /> Inconvénients
                        </h4>
                        <ul className="space-y-2">
                          {school.inconvenients.map(i => (
                            <li key={i} className="text-sm text-[#18181B]/70">{i}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              {index === 3 && <AdBanner />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
