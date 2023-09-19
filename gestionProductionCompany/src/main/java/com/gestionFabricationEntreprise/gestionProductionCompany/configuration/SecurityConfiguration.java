package com.gestionFabricationEntreprise.gestionProductionCompany.configuration;


import com.gestionFabricationEntreprise.gestionProductionCompany.enumeration.Role;
import com.gestionFabricationEntreprise.gestionProductionCompany.filter.JwtAccessDeniedHandler;
import com.gestionFabricationEntreprise.gestionProductionCompany.filter.JwtAuthenticationEntryPoint;
import com.gestionFabricationEntreprise.gestionProductionCompany.filter.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.gestionFabricationEntreprise.gestionProductionCompany.constant.SecurityConstant.PUBLIC_URLS;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;


import org.springframework.http.HttpMethod;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private JwtAuthorizationFilter jwtAuthorizationFilter;
    private JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public SecurityConfiguration(JwtAuthorizationFilter jwtAuthorizationFilter,
                                 JwtAccessDeniedHandler jwtAccessDeniedHandler,
                                 JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                                 @Qualifier("userDetailsService")UserDetailsService userDetailsService,
                                 BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	  http.csrf().disable().cors().and()
          .sessionManagement().sessionCreationPolicy(STATELESS)
          .and().authorizeRequests().antMatchers(PUBLIC_URLS).permitAll()
       //.antMatchers("/api/categorie/all").hasAuthority("ROLE_SUPER_ADMIN")
         /*
          .antMatchers("/api/categorie/add").hasAuthority("ROLE_SUPER_ADMIN")
          .antMatchers("/api/categorie/all").hasAuthority("ROLE_SUPER_ADMIN")
          .antMatchers("/api/categorie/{id}").hasAuthority("ROLE_SUPER_ADMIN")
          .antMatchers("/api/categorie/{id}").hasAuthority("ROLE_SUPER_ADMIN")
          .antMatchers("/api/categorie/{id}").hasAuthority("ROLE_SUPER_ADMIN")
          */
      //    .antMatchers(HttpMethod.GET, "/api/categorie/all").hasAuthority("ROLE_SUPER_ADMIN")
       

          .anyRequest().authenticated()
          .and()
          .exceptionHandling().accessDeniedHandler(jwtAccessDeniedHandler)
          .authenticationEntryPoint(jwtAuthenticationEntryPoint)
          .and()
          .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
