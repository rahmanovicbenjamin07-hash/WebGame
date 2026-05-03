export interface UserDto {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  image: string | null;
}

export interface GuessDto {
  id: number;
  missMeters: number;
  locationId: number;
  userId: number;
  imageUrl: string;
}

export interface NewUploadDto {
  id: number;
  locationImage: string;
  lat: number;
  lng: number;
}

export interface LoginResponseDto {
  data: UserDto;
  message: string;
}

export interface CreateGuessPayload {
  locationId: number | null;
  guessedLat: number;
  guessedLng: number;
  missMeters: number;
}

export interface GuessResponse {
  id: number;
  missMeters: number;
}

export interface SignUpPayload {
  avatar?: string | null;
  avatarName?: string;
  avatarType?: string;
  password: string;
  confirmpassword: string;
  [key: string]: unknown;
}

export interface SignUpResponse {
  id: number;
  email: string;
}

export interface UpdateUserPayload {
  avatarBase64?: string | null;
  avatarName?: string;
  avatarType?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  [key: string]: unknown;
}

export interface UpdateProfileResponse {
  id: number;
  image?: string;
  firstname?: string;  
  lastname?: string;  
}