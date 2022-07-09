// API Enums, Request, and Response Types sourced from:
// https://github.com/acmucsd/membership-portal/commit/4382601bb56990ea2d37333d42a1349e036d1993
// Current as of Jul 8, 2022

import AdminRoutes from './AdminRoutes';
import AttendanceRoutes from './AttendanceRoutes';
import AuthRoutes from './AuthRoutes';
import EventRoutes from './EventRoutes';
import FetchService from './FetchService';
import LeaderboardRoutes from './LeaderboardRoutes';
import MerchStoreRoutes from './MerchStoreRoutes';
import UserRoutes from './UserRoutes';

class ApiInterface {
  fetchService: FetchService;

  adminRoutes: AdminRoutes;

  attendanceRoutes: AttendanceRoutes;

  authRoutes: AuthRoutes;

  eventRoutes: EventRoutes;

  leaderboardRoutes: LeaderboardRoutes;

  merchStoreRoutes: MerchStoreRoutes;

  userRoutes: UserRoutes;

  constructor(logoutHandler: Function) {
    this.fetchService = new FetchService(logoutHandler);
    this.adminRoutes = new AdminRoutes(this.fetchService);
    this.attendanceRoutes = new AttendanceRoutes(this.fetchService);
    this.authRoutes = new AuthRoutes(this.fetchService);
    this.eventRoutes = new EventRoutes(this.fetchService);
    this.leaderboardRoutes = new LeaderboardRoutes(this.fetchService);
    this.merchStoreRoutes = new MerchStoreRoutes(this.fetchService);
    this.userRoutes = new UserRoutes(this.fetchService);
  }

  getRoutes() {
    return {
      ...this.adminRoutes,
      ...this.attendanceRoutes,
      ...this.authRoutes,
      ...this.eventRoutes,
      ...this.leaderboardRoutes,
      ...this.merchStoreRoutes,
      ...this.userRoutes,
    };
  }
}

export * from './ApiRequests';
export * from './ApiResponses';
export * from './Enums';

export default ApiInterface;
