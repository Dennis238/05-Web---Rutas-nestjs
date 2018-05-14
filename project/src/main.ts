/** Realtime Gateway POC */
import * as WebSocket from 'ws';
import * as protobuf from 'protobufjs';
import * as http from 'http';
import { clientFactory, serverBuilder } from 'rxjs-grpc/js';
import { join } from 'path';
import { of } from 'rxjs/Observable/of';

const proto = protobuf.loadSync('./protorepo/UserService/UserService.proto');
const userService = proto.lookupService('user.UserService');
const server = http.createServer();
const socket = new WebSocket.Server({ server });

// Temp: user fixture
const userFixture = {
  id: 1,
};

// POC Shared [hardcoded]
const methodName = 'FindOneUser'; // hardcoded
const findOneUser = userService.methods[methodName]; // Method: "FindOneUser"
const requestTypeName = findOneUser.requestType; // UserById
const requestType = userService.lookupType(requestTypeName); // Type: "UserById"
const responseTypeName = findOneUser.responseType; // User
const responseType = userService.lookupType(responseTypeName); // Type: "User"

// gRPC service (Server)
// Nest (LexSetService / UsersService)
// TODO: remove (testing purposes)
const grpcServer = serverBuilder<any>(
  join(__dirname, '../protorepo'),
  'UserService/UserService.proto',
  'user',
);
grpcServer.addUserService({
  findOneUser(request: any) {
    console.log('gRPC UserService: received ', request, `from RT Gateway`);
    return of(userFixture);
  },
});
grpcServer.start('0.0.0.0:3001');

// gRPC service (Client)
const ClientConstructor = clientFactory(
  join(__dirname, '../protorepo'),
  'UserService/UserService.proto',
  'user',
);
const client = new ClientConstructor('localhost:3001') as any;
const userServiceClient = client.getUserService();

// RT Gateway (proxy)
socket.on('connection', client => {
  client.on('message', (data: Buffer) => {
    const request = requestType.decode(data).toJSON();

    console.log(
      'RT Gateway: received ',
      JSON.stringify(userFixture),
      'from SDK',
    );

    // hardcoded method
    userServiceClient.findOneUser(request).subscribe(data => {
      console.log('RT Gateway: received ', JSON.stringify(data), 'from SVC');
      client.send(responseType.encode(data).finish());
    });
  });
});
server.listen(8080);

// SDK
const sdkClient = new WebSocket('ws://localhost:8080');
sdkClient.on('open', () => {
  console.log('SDK: Connected');

  // Message, type: "UserById"
  const requestMessage = requestType.fromObject(userFixture);
  const bytes = requestType.encode(requestMessage).finish();

  sdkClient.send(bytes);
  console.log('SDK: Send ', JSON.stringify(userFixture), 'as byte[] array');

  sdkClient.on('message', (data: Buffer) => {
    console.log('SDK: Response', data);
    console.log('SDK: Decoded response:', responseType.decode(data).toJSON());
  });
});
