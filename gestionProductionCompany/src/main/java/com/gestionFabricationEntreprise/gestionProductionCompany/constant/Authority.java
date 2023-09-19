package com.gestionFabricationEntreprise.gestionProductionCompany.constant;

public class Authority {
    public static final String[] USER_AUTHORITIES = { "user:read" };
    public static final String[] CLIENT_AUTHORITIES = { "user:read", "user:update" };
    public static final String[] EMPLOYEE_AUTHORITIES = { "user:read", "user:update" };
    public static final String[] RESPONSABLE_AUTHORITIES = { "user:read", "user:create", "user:update", "user:delete"  };
    public static final String[] SUPER_ADMIN_AUTHORITIES = { "user:read", "user:create", "user:update", "user:delete" };
}
