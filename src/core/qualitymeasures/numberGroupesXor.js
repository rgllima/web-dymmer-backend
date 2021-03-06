exports.execute = async (featureModel) => {
    let featureTree = featureModel.feature_tree[0];

    return await numberGroupesXor(featureTree);
}

const numberGroupesXor = async (featureTree) => {
    let response = 0;

    if (featureTree.children) {
        for (let i = 0; i < featureTree.children.length; i++) {
            if (featureTree.children[i].type == 'g' && featureTree.children[i].multiplicity == '1,1')
                response += await numberGroupesXor(featureTree.children[i]) + 1;
            else
                response += await numberGroupesXor(featureTree.children[i]);
        }
    }

    return response;
}
