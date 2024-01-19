import BannerClass from './Banners/BannerClass'
import ChannelsClass from './Channels/ChannelsClass'
import EventosClass from './Eventos/EventosClass'
import FeedsClass from './Feeds/FeedsClass'
import NoticiasClass from './Noticias/NoticiaClass'
import NotificacoesClass from './Notificacoes/NotificacoesClass'
import OrdersClass from './Orders/OrdersClass'
import PropagandaClass from './Propaganda/PropagandaClass'
import SurveysClass from './Surveys/SurverysClass'
import UserClass from './User/UserClass'
import UserPurchaseClass from './UserPurchase/UserPurchasesClass'
import WalletClass from './Wallet/WalletClass'
import YoutubeClass from './Youtube/YoutubeClass'

export default function Classes() {
  const banner = new BannerClass()
  const channels = new ChannelsClass()
  const noticias = new NoticiasClass()
  const eventos = new EventosClass()
  const notificacoes = new NotificacoesClass()
  const propaganda = new PropagandaClass()
  const user = new UserClass()
  const userPurchases = new UserPurchaseClass()
  const youtube = new YoutubeClass()
  const feeds = new FeedsClass()
  const surveys = new SurveysClass()
  const wallets = new WalletClass()
  const orders = new OrdersClass()

  return {
    banner,
    channels,
    noticias,
    notificacoes,
    eventos,
    propaganda,
    user,
    userPurchases,
    orders,
    youtube,
    feeds,
    surveys,
    wallets,
  }
}
