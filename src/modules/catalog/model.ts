import { gql } from "react-apollo/lib";


export const CATEGORY_QUERY = gql`
  query category($id: Int) {
    category(id: $id) {
      id
      name
      alias
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


export const CATEGORIES_QUERY = gql`
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
  query product($id: Int) {
    product(id: $id) {
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

export const PRODUCTS_QUERY = gql`
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
      titleImage {
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


