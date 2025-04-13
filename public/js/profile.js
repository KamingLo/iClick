document.addEventListener('DOMContentLoaded', function() {
  loadUserScores('mouse');
  
  const modeButtons = document.querySelectorAll('.HSmodeButton');
  modeButtons.forEach(button => {
      button.addEventListener('click', function() {
          modeButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const selectedMode = this.getAttribute('data-mode');
          loadUserScores(selectedMode);
      });
  });
});

/**
@param {string} clickMode
*/

function loadUserScores(clickMode) {
  document.getElementById('score-5s').textContent = ' ';
  document.getElementById('score-10s').textContent = ' ';
  document.getElementById('score-15s').textContent = ' ';

  fetch(`/api/user/scores?clickmode=${clickMode}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch scores');
          }
          return response.json();
      })
      .then(data => {
          updateScoreDisplay('score-5s', data.scores5s || '-');
          updateScoreDisplay('score-10s', data.scores10s || '-');
          updateScoreDisplay('score-15s', data.scores15s || '-');
      })
      .catch(error => {
          console.error('Error loading scores:', error);
          document.getElementById('score-5s').textContent = 'Error';
          document.getElementById('score-10s').textContent = 'Error';
          document.getElementById('score-15s').textContent = 'Error';
      });
}

/**
@param {string} elementId
@param {number|string} score
*/

function updateScoreDisplay(elementId, score) {
  const element = document.getElementById(elementId);
  if (element) {
      element.textContent = score;
  }
}
