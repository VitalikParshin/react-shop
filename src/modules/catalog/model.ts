import { gql } from "react-apollo/lib";


export const CATEGORY_QUERY = gql`
  query categories($id: Int) {
    categories(id: $id) {
      products {
        id
        name
        shortDescription
        description
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
          image
        }        
        subProducts {
          id
          article
          price
          oldPrice
          discount
        }
      }
    }
  }
`;


export const PRODUCT_QUERY = gql`
  query products($categoryId: Int) {
    products(categoryId: $categoryId) {
      id
      name
      shortDescription
      description
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
        image
      }        
      subProducts {
        id
        article
        price
        oldPrice
        discount
      }
    }
  }
`;


export const SUB_PRODUCT_QUERY = gql`
  query allSubProducts($filter: SubProductFilter) {
    allSubProducts(filter: $filter) {
      id
      article
      price
      oldPrice
      discount      
      product {
        name
        shortDescription
        description
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
          image
        }        
        subProducts {
          id
          article
          price
          oldPrice
          discount
        }
      }
    }
  }
`;