import { gql } from "react-apollo/lib";


export const CATEGORY_QUERY = gql`
  query allCategories($filter: CategoryFilter) {
    allCategories(filter:$filter) {
      products {
        shortName
        brand {
          id
          name
        }
        category {
          id
          name
        }        
        images {
          id
          url
        }        
        subProducts {
          id
          sku
          price
          priceOld
          discount
        }
      }
    }
  }
`;


export const SUB_PRODUCT_QUERY = gql`
  query allSubProducts($filter: SubProductFilter) {
    allSubProducts(filter: $filter) {
      id
      sku
      price
      priceOld
      discount      
      product {
        shortName
        brand {
          id
          name
        }
        category {
          id
          name
        }        
        images {
          id
          url
        }        
        subProducts {
          id
          sku
          price
          priceOld
          discount
        }
      }
    }
  }
`;