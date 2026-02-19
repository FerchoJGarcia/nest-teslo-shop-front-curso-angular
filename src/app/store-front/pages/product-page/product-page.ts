import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCarrousel } from '@store-front/components/product-carrousel/product-carrousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarrousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  activateRoute = inject(ActivatedRoute);
  ProductService = inject(ProductService);

  //Para leer el parametro de la ruta
  //Traeria algo como /product/tshirt-123
  productIdSlug: string = this.activateRoute.snapshot.params['idSlug'];

  //Aquí se dispara la carga, para que con el idSlug
  //Se llame al servicio y se traiga al producto (Observable)
  productResource = rxResource({
    params: () => ({
      idSlug: this.productIdSlug,
    }),
    stream: ({ params }) => {
      return this.ProductService.getProductByIdSlug(params.idSlug);
    },
  });
}
