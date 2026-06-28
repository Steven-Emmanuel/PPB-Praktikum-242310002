import { StyleSheet } from 'react-native';

export const color_list = {
  orange: '#e8ab3e',
  green: '#a9745e',
  green_light: '#a9745e35',
  cream: '#f8f6f1',
  white: '#efff',
};

export const styles = StyleSheet.create({
  sub_title: { fontSize: 16, color: 'gray' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  shadow: {
    shadowColor: '#e8ab',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  btn_icon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: color_list.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: color_list.cream,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  new_com_container: {
    borderRadius: 10,
    backgroundColor: color_list.green,
    padding: 20,
  },
  new_book_img: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  new_book_title: {
    color: color_list.white,
    fontWeight: 'bold',
  },
  new_book_text: {
    color: color_list.white,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  circle_premium: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: color_list.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_read: {
    width: 150,
    paddingVertical: 8,
    backgroundColor: color_list.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_read_text: {
    fontSize: 14,
    color: color_list.green,
  },
  container_book_collections: {
    flex: 1,
    marginTop: 10,
  },
  container_book_collections_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  h_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  book_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 20,
  },
  book_card: {
    width: '48%',
    backgroundColor: color_list.white,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  book_card_img: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  circle_premium_small: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: color_list.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  book_card_title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
    minHeight: 34,
  },
  book_card_author: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 8,
  },
  book_card_footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  book_card_rating: {
    fontSize: 12,
    color: 'black',
    marginLeft: 4,
    fontWeight: '600',
  },
  book_card_views: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  category_badge_container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  category_badge: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});