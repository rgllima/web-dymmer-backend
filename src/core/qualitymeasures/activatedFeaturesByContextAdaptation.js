const numberOfContexts = require('./numberOfContexts');

exports.execute = async (featureModel) => {
    let contexts = featureModel.contexts;
    let numberOfActivatedFeatures = await countNumberOfActivatedFeatures(contexts);
    let NC = await numberOfContexts.execute(featureModel);

    // If is a SPL
    if (NC === 0) {
        return 0;
    }

    return numberOfActivatedFeatures / NC;
};

const countNumberOfActivatedFeatures = async (contexts) => {
    let numberOfActivatedFeatures = 0;

    for (let i = 0; i < contexts.length; i++) {
        let context = contexts[i];

        for (let j = 0; j < context.resolutions.length; j++) {
            let resolution = context.resolutions[j];

            if (resolution.status === true) {
                numberOfActivatedFeatures++;
            }
        }
    }

    return numberOfActivatedFeatures;
}
