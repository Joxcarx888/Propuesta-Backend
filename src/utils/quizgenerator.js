
function generateWrongAnswer(correct) {
  const value = parseFloat(correct);
  const unit = correct.replace(/[0-9.\s]/g, '');
  const error = (Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1);
  const wrong = (value + error).toFixed(2);
  return wrong + ' ' + unit;
}

function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function generateMRUQuestion() {
  const type = Math.floor(Math.random() * 3); 

  const velocidad = Math.floor(Math.random() * 41) + 10; 
  const tiempo = Math.floor(Math.random() * 16) + 5;     
  const distancia = velocidad * tiempo;

  let questionText, correctAnswer;

  switch (type) {
    case 0:
      questionText = `Un objeto recorre ${distancia} metros en ${tiempo} segundos. ¿Cuál es su velocidad en m/s?`;
      correctAnswer = (distancia / tiempo).toFixed(2) + ' m/s';
      break;
    case 1:
      questionText = `Un objeto se mueve a ${velocidad} m/s durante ${tiempo} segundos. ¿Qué distancia recorre?`;
      correctAnswer = (velocidad * tiempo).toFixed(2) + ' m';
      break;
    case 2:
      questionText = `Un objeto recorre ${distancia} metros a una velocidad constante de ${velocidad} m/s. ¿Cuánto tiempo tardó?`;
      correctAnswer = (distancia / velocidad).toFixed(2) + ' s';
      break;
  }

  const options = shuffleOptions([
    correctAnswer,
    generateWrongAnswer(correctAnswer),
    generateWrongAnswer(correctAnswer),
    generateWrongAnswer(correctAnswer),
  ]);

  return {
    questionText,
    options,
    correctAnswer,
  };
}

export function generateMRUQuiz(userId, categoryId, courseId) {
  const questions = [];

  for (let i = 0; i < 5; i++) {
    questions.push(generateMRUQuestion());
  }

  return {
    title: 'Prueba de Movimiento Rectilíneo Uniforme (MRU)',
    description: 'Evalúa tus conocimientos sobre MRU con estos ejercicios prácticos.',
    category: categoryId,
    course: courseId,
    level: 'Beginner',
    questions,
    createdBy: userId,
  };
}
