export const roles = {
  diretor: {
    canAccess: ['/', '/home', '/alunos', '/professores', '/newclass', '/frequencia', '/diagnostico', '/diario', '/relatorios', '/login', '/register']
  },
  professor: {
    canAccess: ['/', '/professor/frequencia', '/relatorios', '/diario', '/diagnostico']
  }
};