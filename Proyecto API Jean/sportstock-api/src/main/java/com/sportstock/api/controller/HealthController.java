// ==============================
// IMPORTACIONES
// ==============================

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


// ==============================
// CONTROLADOR PRINCIPAL
// ==============================

@RestController
public class HealthController {

    // ==============================
    // ENDPOINT DE PRUEBA
    // ==============================

    @GetMapping("/")
    public String health() {
        return "SportStock API funcionando correctamente 🚀";
    }
}