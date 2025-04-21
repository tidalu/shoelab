
function VisualizeWearLevel(wearLevel) {
    const wearProgress = Math.min(wearLevel, 100);
    const barLength = 20;
    const progressBar = "█".repeat(Math.floor((wearProgress / 100) * barLength));
    const emptyBar = "░".repeat(barLength - progressBar.length);
    return `${progressBar}${emptyBar} ${wearProgress.toFixed(2)}%`;
}


module.exports = VisualizeWearLevel;