import React, { useEffect , useState } from 'react';
import {assets} from '../../assets/frontend_assets/assets'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import './Navbar.css'
// Phần đầu 
const Navbar=()=>
{
    useEffect(() => {
        const toggleBtn = document.querySelector('.toggle_btn')
        const toggleBtnIcon = document.querySelector('.toggle_btn i')
        const dropDownMenu = document.querySelector('.dropdown_menu')

        toggleBtn.onclick = function () {
        dropDownMenu.classList.toggle('open')
        const isOpen = dropDownMenu.classList.contains('open')

        toggleBtnIcon.classList = isOpen
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars'
        }

    }, []);

    const [menu, setMenu] = useState('menu');
    return (
        <div class = 'body'>
            <div class="navbar">
                <img src={assets.logo} alt = '' class = 'logo'/>
                <ul class="navbar-menu">
                    <li onClick ={()=>setMenu('Home')} class = {menu==='Home'?'active':''}>Home</li>
                    <li onClick ={()=>setMenu('Menu')} class = {menu==='Menu'?'active':''}>Menu</li>
                    <li onClick ={()=>setMenu('Services')} class = {menu==='Services'?'active':''}>Services</li>
                </ul>

                <div class= 'navbar-right'>
                    <img src={assets.search_icon} alt=''/>
                    <div class = 'navbar-search-icon'>
                        <img src= {assets.basket_icon} alt=''/>
                        <div class = 'dot'></div>
                    </div>
                    <button>Sign In</button>
                    <div class="toggle_btn">            
                        <i class="fa-solid fa-bars"></i>
                    </div>  
                </div>
            </div>
            <div class='dropdown_menu'>
                <li><a href="hero">Home</a></li>
                <li><a href="about">Menu</a></li>
                <li><a href="services">Services</a></li>
                <li><button>Sign In</button></li>
            </div>
        </div>
    )
}
export default Navbar;