module.exports = {
  error_fetching_gamification(){
    let error = new Error('Error fetching gamification');
    error.friendly_message = 'Erro ao obter detalhes de pontuação';
    error.status = 500
  },
  error_fetching_user(){
    let error = new Error('Error fetching users');
    error.friendly_message = 'Erro ao obter usuários';
    error.status = 500
  },
  error_fetching_pontuaction_from_user(){
    let error = new Error('Error fetching user pontuaction');
    error.friendly_message = 'Erro ao obter detalhes de pontuação desse usuário';
    error.status = 500
  }
}