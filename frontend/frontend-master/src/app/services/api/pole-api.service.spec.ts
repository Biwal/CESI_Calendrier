import { TestBed } from "@angular/core/testing";
import { PoleApiService } from "./pole-api.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { Pole } from "src/app/models/classes/pole";
import { HttpResponse } from "@angular/common/http";

describe("PoleApiService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoleApiService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });

  function setup() {
    const poleService = TestBed.get(PoleApiService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { poleService, httpTestingController };
  }

  it("should be created", () => {
    const service: PoleApiService = TestBed.get(PoleApiService);
    expect(service).toBeTruthy();
  });

  describe("getPoles()", () => {
    it("should return the list of all the poles in the DB", () => {
      const { poleService, httpTestingController } = setup();
      const mockPolesData = [
       new Pole( {
          id: 1,
          name: "informatique",
          color: "#ffb81c"
        }),new Pole(
        {
          id: 2,
          name: "ressources humaines",
          color: "pink"
        })
      ];

      poleService.getPoles().subscribe(
        response => {
          // expect(response.status).toBe(200);
          expect(response).toEqual(mockPolesData);

        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(environment.apiUrl + "poles");
      expect(req.request.method).toBe("GET");
      req.flush(mockPolesData);
    });
  });

  describe("getOnePole(id:number)", () => {
    it("should return the selected pole from the DB", () => {
      const { poleService, httpTestingController } = setup();
      const mockPoleData: Pole = new Pole({
        id: 1,
        name: "informatique",
        color: "#ffb81c"
      });

      poleService.getOnePole(1).subscribe(
        (response: Pole) => {
          expect(response).toEqual(mockPoleData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + "poles/" + 1
      );
      expect(req.request.method).toBe("GET");
      req.flush(mockPoleData);
    });
  });

  describe("addPole(pole:Pole)", () => {
    it("should add the pole in the DB", () => {
      const { poleService, httpTestingController } = setup();
      const mockPoleData = new Pole({
        id: 4,
        name: "informatique",
        color: "#ffb81c"
      });

      poleService.addPole(mockPoleData).subscribe(
        (response: HttpResponse<any>) => {
          expect(response.status).toBe(201);
          expect(response.body).toBe(mockPoleData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(environment.apiUrl + "poles");
      expect(req.request.method).toBe("POST");
      req.flush(new HttpResponse({ status: 201, body: mockPoleData }));
    });
  });

  describe("updatePole(pole:Pole, id:number)", () => {
    it("should update the selected pole in the DB", () => {
      const { poleService, httpTestingController } = setup();
      const id = 2;
      const mockPoleData = new Pole({
        id: 4,
        name: "informatique",
        color: "#ffb81c"
      });
      mockPoleData.setId(id);

      poleService.updatePole(mockPoleData, id).subscribe(
        (response: Pole) => {
          expect(response).toBe(mockPoleData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + "poles/" + id
      );
      expect(req.request.method).toBe("PUT");
      req.flush( mockPoleData );
    });
  });

  describe("deletePole(id:number)", () => {
    it("should delete the selected Pole in the DB", () => {
      const { poleService, httpTestingController } = setup();
      const id = 2;

      poleService.deletePole(id).subscribe(
        (response: HttpResponse<any>) => {
          expect(response.status).toBe(200);
          expect(response.body).toBe(id);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + "poles/" + id
      );
      expect(req.request.method).toBe("DELETE");
      req.flush(new HttpResponse({ status: 200, body: id }));
    });
  });
});
