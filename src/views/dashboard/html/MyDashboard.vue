<template >
   <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
          <div class="app-brand demo">
               
              <span class="app-brand-text demo menu-text fw-bolder ms-2">My Dashboard</span>

            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <ul class="menu-inner py-1">
            <!-- Dashboard -->
          

          

            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">users</span>
            </li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Admin Seeting</div>
              </a>
          
            </li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Display users</div>
              </a>
          
            </li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Add New User</div>
              </a>
          
            </li>
          
            <!-- Components -->
            <li class="menu-header small text-uppercase"><span class="menu-header-text">products</span></li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Display products</div>
              </a>
          
            </li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Add New product</div>
              </a>
          
            </li>
           

            <!-- Forms & Tables -->
            <li class="menu-header small text-uppercase"><span class="menu-header-text">Categories</span></li>
            <!-- Forms -->
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Display Categories</div>
              </a>
          
            </li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Add New Category</div>
              </a>
          
            </li>
            <!-- Misc -->
            <li class="menu-header small text-uppercase"><span class="menu-header-text">Orders</span></li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Display Orders</div>
              </a>
          
            </li>
            <li class="menu-item">
              <a class="menu-link ">
                <div data-i18n="Account Settings">Add New Order</div>
              </a>
          
            </li>
          </ul>
        </aside>
</template>
<script>
export default {
    
}
</script>
<style >
    
</style>