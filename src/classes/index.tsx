import BannerClass from './Banners/BannerClass';
import EventosClass from './Eventos/EventosClass';
import NoticiasClass from './Noticias/NoticiaClass';
import NotificacoesClass from './Notificacoes/NotificacoesClass';
import PropagandaClass from './Propaganda/PropagandaClass';
import RedirecionamentoClass from './Redirecionamentos/RedirecionamentoClass';
import UserClass from './User/UserClass';

export default function Classes() {
  const banner = new BannerClass();
  const noticias = new NoticiasClass();
  const eventos = new EventosClass();
  const notificacoes = new NotificacoesClass();
  const propaganda = new PropagandaClass();
  const redirecionamentos = new RedirecionamentoClass();
  const user = new UserClass();

  return {
    banner,
    noticias,
    notificacoes,
    eventos,
    propaganda,
    redirecionamentos,
    user,
  };
}
