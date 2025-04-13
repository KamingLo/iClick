// Fungsi untuk menampilkan leaderboard saat user memilih mode tertentu
document.addEventListener('DOMContentLoaded', function() {
    const timeTabs = document.querySelectorAll('.tmblModeT');
    const clickTabs = document.querySelectorAll('.tmblModeG');
    
    function updateLeaderboard() {
        const activeTimeMode = document.querySelector('.tmblModeT.active').dataset.timemode;
        const activeClickMode = document.querySelector('.tmblModeG.active').dataset.clickmode;
        
        document.querySelectorAll('.dislpayLeaderboard').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(`leaderboard-${activeTimeMode}-${activeClickMode}`).classList.add('active');
    }
    
    timeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            timeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            updateLeaderboard();
        });
    });
    
    clickTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            clickTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            updateLeaderboard();
        });
    });
});