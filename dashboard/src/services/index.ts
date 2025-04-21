import Admin from './admin';
import Auth from './auth';
import { FirebaseService } from './firebase';
import Users from './users';

export default class Services {
	static admin = Admin;
	static auth = Auth;
	static firebase = FirebaseService;
	static users = Users;
}
