import express from 'express';

import nextApp from '@nextql/client';
import apolloServer from '@nextql/graphql';

const { PORT } = process.env;

async function main() {
    const app = express();

    await bootstrapApolloServer(app);
    await bootstrapClientApp(app);

    app.listen(PORT, () => {
        console.log(`[ server ] ready on port ${PORT}`);
    });
}

async function bootstrapClientApp(expressApp) {
    await nextApp.prepare();
    expressApp.get('*', nextApp.getRequestHandler());
}

async function bootstrapApolloServer(expressApp) {
    apolloServer.applyMiddleware({ app: expressApp });
}

main();
