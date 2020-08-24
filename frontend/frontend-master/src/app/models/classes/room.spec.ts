import { Room } from "./room";
import { Reservation } from "./reservation";

describe("Room", () => {
  let id: number;
  let name: string;
  let capacity: number;
  let reservations: Reservation[];
  let mockRoomData: Room;
  const mockReservations: Reservation[] = [
    new Reservation({
      dateStart: new Date(),
      dateEnd: new Date(),
      id: 6
    }),
    new Reservation({
      dateStart: new Date(),
      dateEnd: new Date(),
      id: 9
    })
  ];

  beforeEach(() => {
    id = 1;
    name = "Westeros";
    capacity = 18;
    reservations = mockReservations;
    mockRoomData = new Room({
      id,
      name,
      capacity,
      reservations
    });
  });

  it("should create an instance", () => {
    expect(mockRoomData).toBeTruthy();
  });

  it("getId() should return id", () => {
    const expectId = mockRoomData.getId;
    expect(expectId).toBe(id);
  });

  it("setId(v : number) should change the  id", () => {
    const mockId = 6;
    mockRoomData.setId(mockId);
    expect(mockRoomData.getId).toBe(mockId);
  });

  it("getName() should return name", () => {
    const expectName = mockRoomData.getName;
    expect(expectName).toBe(name);
  });

  it("setName(name: string) should change the name", () => {
    const mockName = "hello";
    mockRoomData.setName(mockName);
    expect(mockRoomData.getName).toBe(mockName);
  });

  it("getCapacity() should return capacity", () => {
    const expectCapacity = mockRoomData.getCapacity;
    expect(expectCapacity).toBe(capacity);
  });

  it("setCapacity(v: number) should change the capacity", () => {
    const mockCapacity = 4;
    mockRoomData.setCapacity(mockCapacity);
    expect(mockRoomData.getCapacity).toBe(mockCapacity);
  });

  it("getReservations() should return reservations", () => {
    const expectReservation = mockRoomData.getReservations;
    expect(expectReservation).toBe(reservations);
  });

  it("setReservations(v: Reservation[]) should change all the reservations", () => {
    mockRoomData.setReservations(mockReservations);
    expect(mockRoomData.getReservations).toBe(mockReservations);
  });

  it("addReservation(v: Reservation) should add a reservation to the  list", async () => {
    const reservationToAdd = new Reservation({
      dateStart: new Date(),
      dateEnd: new Date(),
      room: mockRoomData,
      id: 1111
    });
    const expectedResult = [
      new Reservation({
        dateStart: new Date(),
        dateEnd: new Date(),
        id: 6
      }),
      new Reservation({
        dateStart: new Date(),
        dateEnd: new Date(),
        id: 9
      }),new Reservation({
        dateStart: new Date(),
        dateEnd: new Date(),
        id: 1111
      })
    ];
    spyOn(mockRoomData.getReservations, "push");

     mockRoomData.addReservation(reservationToAdd);

    expect(mockRoomData.getReservations.push).toHaveBeenCalledTimes(1);
  });

  it("addReservation(v: Reservation) should not add a reservation to the  list", () => {});

  it("removeReservation(v: Reservation) should not remove a reservation from the list", () => {
    const reservationToDelete = new Reservation({
      dateStart: new Date(),
      dateEnd: new Date(),
      room: mockRoomData,
      id: 1111
    });
    const expectedResult = mockRoomData.getReservations;
    spyOn(mockRoomData.getReservations, "indexOf");
    spyOn(mockRoomData.getReservations, "splice");

    mockRoomData.removeReservation(reservationToDelete);

    expect(mockRoomData.getReservations.indexOf).toHaveBeenCalledTimes(0);
    expect(mockRoomData.getReservations.splice).toHaveBeenCalledTimes(0);
  });

  it("removeReservation(v: Reservation) should remove a reservation from the list", () => {
    const c = mockRoomData.getReservations.slice()
    const reservationToDelete = reservations[1];
    const expectedResult = [reservations[0]];
    spyOn(mockRoomData.getReservations, "indexOf");
    spyOn(mockRoomData.getReservations, "splice");

     mockRoomData.removeReservation(reservationToDelete);

    expect(mockRoomData.getReservations.indexOf).toHaveBeenCalledTimes(1);
    expect(mockRoomData.getReservations.splice).toHaveBeenCalledTimes(1);
  });
});
