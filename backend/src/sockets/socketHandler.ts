import { Server as SocketIOServer, Socket } from 'socket.io';

let ioInstance: SocketIOServer | null = null;

export const initSocketServer = (io: SocketIOServer) => {
  ioInstance = io;

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.on('join_branch', (branchId: string) => {
      socket.join(`branch_${branchId}`);
      console.log(`[Socket.IO] Client ${socket.id} joined room branch_${branchId}`);
    });

    socket.on('join_kds', (stationCode?: string) => {
      socket.join('kds_room');
      if (stationCode) {
        socket.join(`station_${stationCode}`);
      }
      console.log(`[Socket.IO] Client ${socket.id} joined KDS room`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};

export const getIO = (): SocketIOServer | null => {
  return ioInstance;
};

export const emitOrderCreated = (order: any) => {
  if (!ioInstance) return;
  ioInstance.to(`branch_${order.branchId}`).emit('order_created', order);
  ioInstance.to('kds_room').emit('kds_new_ticket', order);
};

export const emitOrderStatusChanged = (orderId: string, status: string, branchId: string) => {
  if (!ioInstance) return;
  ioInstance.to(`branch_${branchId}`).emit('order_status_updated', { orderId, status });
  ioInstance.to('kds_room').emit('kds_ticket_updated', { orderId, status });
};

export const emitTableStatusChanged = (tableId: string, status: string, branchId: string) => {
  if (!ioInstance) return;
  ioInstance.to(`branch_${branchId}`).emit('table_status_updated', { tableId, status });
};
