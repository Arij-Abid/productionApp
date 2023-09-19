package com.gestionFabricationEntreprise.gestionProductionCompany.enumeration;

import static com.gestionFabricationEntreprise.gestionProductionCompany.constant.Authority.*;


public enum Role {
    ROLE_USER(USER_AUTHORITIES),
    ROLE_CLIENT(CLIENT_AUTHORITIES),
    ROLE_RESPONSABLE(RESPONSABLE_AUTHORITIES),
    ROLE_EMPLOYEE(EMPLOYEE_AUTHORITIES),
    ROLE_SUPER_ADMIN(SUPER_ADMIN_AUTHORITIES);

    private String[] authorities;

    Role(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() {
        return authorities;
    }
}
