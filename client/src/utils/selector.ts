import { BsArchive, BsArrowRight, BsCalendar3, BsCreditCard2Front, BsPeople, BsPlusLg, BsSearch } from "react-icons/bs";
import { FiGitPullRequest, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { IoClose, IoCopyOutline, IoMenu, IoRefresh } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";


export const IconSelector = {
    menuIcon: {
        home: FiHome,
        volunteer: BsPeople,
        request: FiGitPullRequest,
        event: RxDashboard,
        user: FiUser,
        card: BsCreditCard2Front,
        archive: BsArchive,
        calender: BsCalendar3,
        logout: FiLogOut,
        menuBar: IoMenu,
        close: IoClose,
        back: IoIosArrowBack,
    },

    all: {
        search: BsSearch,
        add: BsPlusLg,
        close: IoClose,
        arrowRight: BsArrowRight,
        reset: IoRefresh,
        back: IoIosArrowBack,
        copy: IoCopyOutline,
    }


}