import { useNavigate } from "react-router-dom";
import userImg from "../../assets/home/user.jpg";
// icons
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";
import MessageIcon from "./icons/MessageIcon";
import NotifiactionIcon from "./icons/NotifiactionIcon";
import SettingIcon from "./icons/SettingIcon";
// firebase
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLogInfo } from "../../slices/userSlice";

const Sidebar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogInfo(null));
        localStorage.removeItem("userData");
        navigate("/login");
        console.log("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.code);
      });
  };
  return (
    <div className="h-full">
      <nav className="bg-primary h-full rounded-20px pt-7 pb-10 flex flex-col items-center justify-between">
        <div className="w-3/4 mx-auto rounded-full overflow-hidden ">
          <img src={userImg} alt="userImage" />
        </div>
        <ul className="w-full mb-20">
          <li className="relative mb-14 text-5xl cursor-pointer h-[80px] before:content-[''] before:h-full before:w-[80%] before:bg-white before:absolute before:top-0 before:right-0  before:rounded-l-20px before:transition-all before:duration-300 before:ease-linear  after:content-[''] after:h-20 after:w-[8px] after:bg-primary after:absolute after:top-[50%] after:right-0 after:translate-y-[-50%] after:rounded-l-20px after:transition-all after:duration-300 after:ease-linear after:drop-shadow-iconDropShadow hover:before:w-[84] text-primary mt-8">
            <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear drop-shadow-navIconDropShadow">
              <HomeIcon />
            </div>
          </li>
          <li className="relative h-12  mb-14 text-5xl text-[#BAD1FF] cursor-pointer w-full]">
            <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear drop-shadow-iconDropShadow">
              <MessageIcon />
            </div>
          </li>
          <li className="relative h-12  mb-14 text-5xl text-[#BAD1FF] cursor-pointer ]">
            <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear drop-shadow-iconDropShadow">
              <NotifiactionIcon />
            </div>
          </li>
          <li className="relative w-full h-12  text-5xl text-[#BAD1FF] cursor-pointer ]">
            <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ease-linear drop-shadow-iconDropShadow">
              <SettingIcon />
            </div>
          </li>
        </ul>
        <div
          onClick={handleLogOut}
          className="text-5xl text-white drop-shadow-navIconDropShadow cursor-pointer pt5"
        >
          <LogoutIcon />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
