import { BsArchive, BsCalendar3, BsCreditCard2Front, BsPeople, BsSearch } from "react-icons/bs";
import { FiGitPullRequest, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

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
    },

    all: {
        search: BsSearch,
        add: IoAdd,
    }


}