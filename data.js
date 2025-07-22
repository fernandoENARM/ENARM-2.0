// Sample flashcard data - replace with your actual content
const flashcards = {
    medicina: [
        {
            id: 'm1',
            question: '¿Cuál es el tratamiento de primera línea para la hipertensión arterial?',
            answer: 'Inhibidores de la ECA o ARA II',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'm2',
            question: '¿Cuáles son los criterios diagnósticos de DM2?',
            answer: 'HbA1c ≥6.5% o GPC ≥126 mg/dl en ayunas o G ≥200 mg/dl a las 2h de SOG o síntomas de hiperglucemia más GPC al azar ≥200 mg/dl',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'm3',
            question: '¿Cuál es el tratamiento de elección para una neumonía adquirida en la comunidad en paciente ambulatorio sin comorbilidades?',
            answer: 'Amoxicilina 1g cada 8h por 5-7 días o Doxiciclina 100mg cada 12h por 5-7 días',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'm4',
            question: '¿Cuáles son los criterios diagnósticos de sepsis?',
            answer: 'SOSPECHA de infección + SOFA ≥2 puntos (o qSOFA ≥2 en contexto extrahospitalario)',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        }
    ],
    cirugia: [
        {
            id: 'c1',
            question: '¿Cuáles son los signos de alarma de una hemorragia digestiva alta?',
            answer: 'Hematemesis, melenas, inestabilidad hemodinámica',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'c2',
            question: '¿Cuáles son los criterios de manejo quirúrgico en colecistitis aguda?',
            answer: 'Datos de peritonitis, empiema, gangrena, perforación o empiema vesicular',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'c3',
            question: '¿Cuál es la escala para valorar la gravedad de la pancreatitis aguda?',
            answer: 'Escala de Ranson o APACHE II',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'c4',
            question: '¿Cuáles son los criterios de ingreso a UCI en pancreatitis aguda?',
            answer: 'Falla orgánica persistente, síndrome de respuesta inflamatoria sistémica, signos de alarma en las primeras 72h',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        }
    ],
    pediatria: [
        {
            id: 'p1',
            question: '¿Cuál es la dosis de paracetamol en niños?',
            answer: '10-15 mg/kg/dosis cada 4-6 horas (máximo 5 dosis en 24h)',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'p2',
            question: '¿Cuáles son los signos de deshidratación en niños?',
            answer: 'Ojeras, mucosas secas, llanto sin lágrimas, fontanela hundida, disminución de la diuresis, letargo',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'p3',
            question: '¿Cuál es el tratamiento de primera línea para la crisis asmática en niños?',
            answer: 'Salbutamol inhalado + corticoides sistémicos',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'p4',
            question: '¿Cuáles son los signos de alarma en fiebre sin foco en menores de 3 meses?',
            answer: 'Temperatura >38°C, irritabilidad, rechazo al alimento, letargo, dificultad respiratoria',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        }
    ],
    ginecologia: [
        {
            id: 'g1',
            question: '¿Cuáles son los criterios diagnósticos de síndrome de ovario poliquístico?',
            answer: 'Al menos 2 de 3: 1) Oligo-ovulación o anovulación, 2) Hiperandrogenismo clínico o bioquímico, 3) Ovarios poliquísticos en ecografía',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'g2',
            question: '¿Cuál es el manejo inicial de la preeclampsia severa?',
            answer: 'Sulfato de magnesio como neuroprotector, control de presión arterial con labetalol o hidralazina, y terminación del embarazo',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'g3',
            question: '¿Cuáles son los criterios diagnósticos de endometriosis?',
            answer: 'Dismenorrea, dispareunia, infertilidad, hallazgos ecográficos o por RM, confirmación histológica',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'g4',
            question: '¿Cuál es el manejo del sangrado uterino anormal?',
            answer: 'Anticonceptivos hormonales, AINEs, ácido tranexámico, dispositivo intrauterino con levonorgestrel',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        }
    ],
    atls: [
        {
            id: 'a1',
            question: '¿Cuál es la secuencia ABCDE en el manejo inicial del trauma?',
            answer: 'A: Vía aérea con control cervical, B: Ventilación, C: Circulación, D: Discapacidad (estado neurológico), E: Exposición/control ambiental',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'a2',
            question: '¿Cuáles son los signos de neumotórax a tensión?',
            answer: 'Hipersonoridad, desviación traqueal, distensión venosa yugular, taquicardia, hipotensión, disminución de ruidos respiratorios',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'a3',
            question: '¿Cuál es el manejo inicial del TCE grave?',
            answer: 'Asegurar vía aérea, mantener PAM >80 mmHg, evitar hipotensión e hipoxia, valorar necesidad de intubación, TAC de cráneo urgente',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'a4',
            question: '¿Cuáles son los signos de taponamiento cardíaco?',
            answer: 'Tríada de Beck: hipotensión, ingurgitación yugular, ruidos cardíacos apagados',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        }
    ],
    acls: [
        {
            id: 'ac1',
            question: '¿Cuál es la dosis de adrenalina en una parada cardiorrespiratoria?',
            answer: '1 mg cada 3-5 minutos (0.01 mg/kg en niños)',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'ac2',
            question: '¿Cuál es el ritmo desfibrilable?',
            answer: 'Fibrilación ventricular (FV) y taquicardia ventricular sin pulso (TVSP)',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'ac3',
            question: '¿Cuál es el manejo de la bradicardia sintomática?',
            answer: 'Atropina 0.5-1 mg IV cada 3-5 minutos (hasta 3 mg), marcapasos transcutáneo, dopamina o epinefrina en infusión si refractario',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        },
        {
            id: 'ac4',
            question: '¿Cuál es el manejo de la taquicardia ventricular con pulso estable?',
            answer: 'Amiodarona 150 mg en 10 min o cardioversión eléctrica sincronizada si inestable',
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0
        }
    ]
};

// Initialize with sample data if no data exists
if (!localStorage.getItem('decks')) {
    localStorage.setItem('decks', JSON.stringify(flashcards));
}
