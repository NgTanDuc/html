import React from "react";
import './ExploreMenu.css'
import { menu_list } from "../../assets/frontend_assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div class='explore-menu' id='explore-menu'>
            <h1>explore our menu</h1>
            <p class='explore-menu-text'>Choose from a menu</p>
            <div class='explore-menu-list'>
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} key={index} class='explore-menu-list-item'>
                            <img class={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt='' />
                            <p> {item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>

    )

}
export default ExploreMenu