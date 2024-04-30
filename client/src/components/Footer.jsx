import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiShopee } from "react-icons/si";
import { MdLocalPrintshop } from "react-icons/md";
import { FaBehance } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Footer = (props) => {
    return (
        <>
            <footer className='sticky bottom-0 z-30 bg-black w-full p-4'>
                <div className='flex justify-center gap-5 items-baseline text-yellow-50'>
                    <div>
                        <p>Social Media:</p>
                        <div className="flex justify-around">
                            <Link to='https://www.instagram.com/thekneeecaps/'>
                                <FaInstagram className="hover:text-amber-500" />
                            </Link>
                            <Link to='https://www.behance.net/danietayactac'>
                                <FaBehance className="hover:text-amber-500" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p>Other Shops:</p>
                        <div className="flex justify-around">
                            <Link to='https://shopee.ph/doughnublubby?fbclid=PAAab6KJmThqfWJ0VPyCpn6DZI-7FUtwOfeUz-PtMZNM16OkhyrNI0W9suMuA'>
                                <SiShopee className="hover:text-amber-500" />
                            </Link>
                            <Link to='https://www.inprnt.com/gallery/thekneeecaps/'>
                                <MdLocalPrintshop className="hover:text-amber-500" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p>Connect with me:</p>
                        <div className="flex justify-around items-center gap-2">
                            <BiLogoGmail className="hover:text-amber-500"/>
                            <p className="hover:text-amber-500">danietayactac@gmail.com</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;