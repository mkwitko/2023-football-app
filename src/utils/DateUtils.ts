import { parse, isAfter, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const validityDateHour = (date: string, hour: string) => {
    const validityDateTime = parse(`${date} ${hour}`, 'dd/MM/yyyy HH:mm', new Date(), { locale: ptBR });
    const currentDate = new Date();

    return isAfter(validityDateTime, currentDate);
}

export const createDateFromNow = (dateFormat = null ) => {
    const date = new Date()

    if (dateFormat) {
      return format(date, dateFormat)
    }

    return format(date, 'dd/MM/yyyy HH:mm:ss')
  }