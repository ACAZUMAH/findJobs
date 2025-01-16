import { useServer } from "graphql-ws/lib/use/ws";
import { CreateGraphQLsubscriptionServer } from "../common/Interfaces";
import { WebSocketServer } from "ws";


export const createGraphQLsubscriptionServer = ({ httpServer, schema }: CreateGraphQLsubscriptionServer ) => {
    const wsSever = new WebSocketServer({
        path: '/graphql',
        server: httpServer
    })

    const serverCleanUp = useServer({ schema }, wsSever);
    return serverCleanUp;
};
