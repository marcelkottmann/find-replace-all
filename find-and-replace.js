const execSync = require('child_process').execSync;

function checkIfCommandsAvailable() {
    execSync('which egrep');
    execSync('which xargs');
    execSync('which sed');
}

/**
 * Searches and replaces recursively the given directory and replaces every occurence.
 * 
 * Returns true, if something was replaced. Returns false otherwise.
 */
function findAndReplace(directory, find, replace) {
    try {
        checkIfCommandsAvailable();
    } catch (error) {
        console.error('Necessary commands are not available.');
        return;
    }

    const command = `egrep -lRZ '${find}' ${directory} | xargs -0 -l sed -i -e 's/${find}/${replace}/g'`
    try {
        execSync(command);
    } catch (error) {
        return false;
    }
    return true;
}

module.exports = findAndReplace;