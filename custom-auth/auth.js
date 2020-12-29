
exports.lambdaHandler = async (event, context) => {

    switch (event.authorizationToken) {
        case 'allow':
            return generateAuthResponse('user', 'Allow', event.methodArn);
        default:
            return generateAuthResponse('user', 'Deny', event.methodArn);
    }
    
}

function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn);

    return {
        principalId,
        policyDocument
    }
}

function generatePolicyDocument(effect, methodArn) {
    if (!effect || !methodArn) return null

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };

    return policyDocument;
}