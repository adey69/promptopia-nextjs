interface IUser {
  _id: string;
  email: string;
  image?: string;
  username: string;
}
interface IPost {
  _id?: string;
  creator?: IUser;
  prompt: string;
  tag: string;
}
