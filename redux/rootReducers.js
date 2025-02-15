import { combineReducers } from 'redux';
import AuthReducer from './authentication/reducers';
import OnBoardingReducer from './onboarding/reducers';
import SkillsReducer from './skills/reducers';
import CoursesReducer from './courses/reducers';
import ProfileReducer from './profile/reducers';
import WorkExprienceReducer from './work_exprience/reducers';
import EducationsReducer from './educations/reducers';
import settingsReducer from './settings/reducers';
// import ChangeLayoutMode from './themeLayout/reducers';


const rootReducers = combineReducers({  
  auth: AuthReducer,
  onboarding: OnBoardingReducer,
  skills: SkillsReducer,
  courses: CoursesReducer,
  myProfile: ProfileReducer,
  educations: EducationsReducer,
  workExprience: WorkExprienceReducer,
  userSettings: settingsReducer,
  Courses: CoursesReducer
  // ChangeLayoutMode,
});

export default rootReducers;
