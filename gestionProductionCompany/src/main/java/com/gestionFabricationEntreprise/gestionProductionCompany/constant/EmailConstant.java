package com.gestionFabricationEntreprise.gestionProductionCompany.constant;

public class EmailConstant {
    public static final String SIMPLE_MAIL_TRANSFER_PROTOCOL = "smtps";
    public static final String USERNAME = "abidarij1@gmail.com";
    public static final String PASSWORD = "torz zbnp ucoq ixyw";
    public static final String FROM_EMAIL = "arij.abid@polytechnicien.tn";
    public static final String CC_EMAIL = "";
    public static final String EMAIL_SUBJECT = "New Password";

    // message.setText("Hello " + firstName + ", \n \n Your new account password is: " + password + "\n \n The Support Team");
    public static final String EMAIL_BODY =
            "<html>"
                    + "<body>"
                    + "<h4>Hello</h4>"
                    + "<p>Dear <span style='color: blue;'>\" %s  %s</span></p>"
                    + "<p>Your new password is: <strong><span style='color: green;'>\"  %s </span></strong></p>"

                    + "</body>"
                    + "</html>";



    public static final String GMAIL_SMTP_SERVER = "smtp.gmail.com";
    public static final String SMTP_HOST = "mail.smtp.host";
    public static final String SMTP_AUTH = "mail.smtp.auth";
    public static final String SMTP_PORT = "mail.smtp.port";
    public static final int DEFAULT_PORT = 465;
    public static final String SMTP_STARTTLS_ENABLE = "mail.smtp.starttls.enable";
    public static final String SMTP_STARTTLS_REQUIRED = "mail.smtp.starttls.required";
}
