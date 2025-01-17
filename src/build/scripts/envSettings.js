const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                FEATURE_LOGGING:'${process.env.FEATURE_LOGGING}',
                FEATURE_HISTORIKK:'${process.env.FEATURE_HISTORIKK}',
                FEATURE_MINI_DIALOG:'${process.env.FEATURE_MINI_DIALOG}',
                FEATURE_DIN_PLAN: '${process.env.FEATURE_DIN_PLAN}'
            };`
        );
    });
}
module.exports = createEnvSettingsFile;
