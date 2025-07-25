interface ProfileState {
      name: string | null;
      age: number | null;
    }

interface ProfileType {
    name: string;
    reducers: {
      setName: (state: ProfileState, action: { payload: ProfileState['name'] }) => void;
      setAge: (state: ProfileState, action: { payload: ProfileState['age'] }) => void;
    };

  initialState: ProfileState;
}
export type { ProfileType, ProfileState };