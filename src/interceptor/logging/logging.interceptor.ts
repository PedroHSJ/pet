import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Entity, Repository, getConnection, getRepository } from 'typeorm';
import { LogEntity } from './logging.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @InjectRepository(LogEntity)
        private logRepository: Repository<LogEntity>,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();
        const { method, url, user, body } = request;

        const action = this.getActionFromRequest(method, body); // Implemente essa função para determinar a ação
        const tableName = this.getTableNameFromRoute(url); // Implemente essa função para determinar a tabela

        return next.handle().pipe(
            tap(() => {
                const elapsedTime = Date.now() - now;

                const log = {
                    method,
                    route: url,
                    action,
                    tableName,
                    user: user?.id || null,
                    responseTime: `${elapsedTime}ms`,
                };

                // Salvar log no banco de dados
                console.log(log);
                this.logRepository.save(this.logRepository.create(log));
            }),
        );
    }

    private getActionFromRequest(method: string, body: any): string {
        // Implemente essa função para determinar a ação com base no método HTTP e no corpo da solicitação
        if (method === 'POST') return 'CREATE';
        if (method === 'PUT') return 'UPDATE';
        if (method === 'DELETE') return 'DELETE';
        return 'READ';
    }

    private getTableNameFromRoute(route: string): string {
        // pegando nome da tabela a partir da rota
        const routeParts = route.split('/');
        const tableName = routeParts[routeParts.length - 1];
        return tableName;
    }
}
