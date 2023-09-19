package com.gestionFabricationEntreprise.gestionProductionCompany.controller;

import static com.gestionFabricationEntreprise.gestionProductionCompany.constant.SecurityConstant.JWT_TOKEN_HEADER;
import static org.springframework.http.HttpStatus.OK;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Category;
import com.gestionFabricationEntreprise.gestionProductionCompany.entities.Client;
import com.gestionFabricationEntreprise.gestionProductionCompany.enumeration.Role;
import com.gestionFabricationEntreprise.gestionProductionCompany.service.CategoryService;
import com.gestionFabricationEntreprise.gestionProductionCompany.utility.JWTTokenProvider;
import com.gestionFabricationEntreprise.gestionProductionCompany.domain.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/categorie")
public class CategoryController {

 
	 @Autowired
    private CategoryService categoryService;
	  private JWTTokenProvider jwtTokenProvider;
	  @Autowired
	  private HttpServletRequest request;
	   private AuthenticationManager authenticationManager;
    @Autowired
    public CategoryController(AuthenticationManager authenticationManager,CategoryService categoryService,JWTTokenProvider jwtTokenProvider) {
        this.categoryService = categoryService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        
    }

    @PostMapping("/add")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
    /*    if (!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_SUPER_ADMIN"))) {
            // User is not authorized to perform this action
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        */
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
 
    
    /*
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        // Vérifiez si le principal est une instance de UserDetails
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;

            // Vérifiez si l'utilisateur a l'autorité "ROLE_SUPER_ADMIN"
            if (userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_SUPER_ADMIN"))) {
                List<Category> categories = categoryService.getAllCategories();
                return ResponseEntity.ok(categories);
            }
        }

        // L'utilisateur n'est pas autorisé à effectuer cette action
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

*/
    /*
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories(Authentication authentication) {
        if (!hasAuthority(authentication, Role.ROLE_SUPER_ADMIN)) {
            // L'utilisateur n'est pas autorisé à effectuer cette action
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Vous pouvez accéder à l'utilisateur connecté via l'objet Authentication
        User loggedInUser = (User) authentication.getPrincipal();

        // Utilisez loggedInUser comme nécessaire...

        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.ok(categories);
    }

*/
    private String getCurrentUserToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7); // Supprime le préfixe "Bearer " du jeton
        }
        return null;
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }

    
    private HttpHeaders getJwtHeader(UserPrincipal user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(user));
        return headers;
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
  
    /*
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories(HttpServletRequest request) {
        String token = getCurrentUserToken(request);
        if (token != null) {
            // Utilisez votre JWTTokenProvider pour vérifier le jeton et extraire les informations nécessaires
            String username = jwtTokenProvider.getSubject(token);
            if (jwtTokenProvider.isTokenValid(username, token)) {
                // Récupérer les autorités (rôles) de l'utilisateur à partir du jeton
                List<GrantedAuthority> authorities = jwtTokenProvider.getAuthorities(token);

                // Vérifier si l'utilisateur a l'autorité ROLE_SUPER_ADMIN
                boolean hasSuperAdminRole = authorities.stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_SUPER_ADMIN"));

                if (hasSuperAdminRole) {
                    List<Category> categories = categoryService.getAllCategories();
                    return ResponseEntity.ok(categories);
                } else {
                    // L'utilisateur n'a pas l'autorité ROLE_SUPER_ADMIN, retourner une réponse Unauthorized
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }
        }

        // Le jeton est manquant ou invalide, retourner une réponse Unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    
    */
    
   /* 
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories(HttpServletRequest request) {
        String token = getCurrentUserToken(request);
        if (token != null) {
            // Utilisez votre JWTTokenProvider pour vérifier le jeton et extraire les informations nécessaires
            String username = jwtTokenProvider.getSubject(token);
            if (jwtTokenProvider.isTokenValid(username, token)) {
                // Récupérer les autorités (rôles) de l'utilisateur à partir du jeton
                List<GrantedAuthority> authorities = jwtTokenProvider.getAuthorities(token);

                // Vérifier si l'utilisateur a l'autorité ROLE_SUPER_ADMIN
                boolean hasSuperAdminRole = authorities.stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_SUPER_ADMIN"));

                if (hasSuperAdminRole) {
                    List<Category> categories = categoryService.getAllCategories();
                    return ResponseEntity.ok(categories);
                } else {
                    // L'utilisateur n'a pas l'autorité ROLE_SUPER_ADMIN, retourner une réponse Unauthorized
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }
        }

        // Le jeton est manquant ou invalide, retourner une réponse Unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

*/
    @PutMapping("/{id}")
  
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(updatedCategory);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
    	Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
    @DeleteMapping("/{id}")
 
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

 // Helper method to check if the user has the specified authority
 private boolean hasAuthority(Authentication authentication, Role role) {
     return authentication.getAuthorities().contains(new SimpleGrantedAuthority(role.name()));
 }
 
 
 
 
}