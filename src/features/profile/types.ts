export interface IUser {
    success: boolean;
    message: string;
    data:    IUserData;
}

export interface IUserData {
    _id:             string;
    name:            string;
    email:           string;
    username:        string;
    bio:             string;
    preferredGenres: string[];
    isOnboarded:     boolean;
    createdAt:       Date;
    updatedAt:       Date;
    __v:             number;
    profileImage: {
        path: string;
        filename: string;
    }
    totalReviews:    number;
    averageRating:   number;
}