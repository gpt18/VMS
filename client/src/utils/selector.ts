import { BsArchive, BsArrowRight, BsCalendar3, BsCreditCard2Front, BsGenderAmbiguous, BsPeople, BsPlusLg, BsSearch, BsUpload } from "react-icons/bs";
import { FiEdit, FiGitPullRequest, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { IoCameraOutline, IoClose, IoCopyOutline, IoMenu, IoQrCode, IoRefresh } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowBack, IoMdMore } from "react-icons/io";
import { FcApproval, FcImageFile } from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";


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
        more: IoMdMore,
        edit: FiEdit,
        qr: IoQrCode,
        camera: IoCameraOutline,
        upload: BsUpload,
        approve: FcApproval,
        delete: RiDeleteBinLine,
        image: FcImageFile,
    },

    other: {
        gender: BsGenderAmbiguous,
    }



}