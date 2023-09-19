package com.gestionFabricationEntreprise.gestionProductionCompany.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionFabricationEntreprise.gestionProductionCompany.domain.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);

    User findUserByEmail(String email);
    
    List<User> findByRole(String role);

  Optional<User> findByIdAndRole(Long id, String role);
  User findByUserId(String userId);
  


}
