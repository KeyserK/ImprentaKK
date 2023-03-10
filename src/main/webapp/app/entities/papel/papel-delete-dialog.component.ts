import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPapel } from 'app/shared/model/papel.model';
import { PapelService } from './papel.service';

@Component({
  selector: 'jhi-papel-delete-dialog',
  templateUrl: './papel-delete-dialog.component.html'
})
export class PapelDeleteDialogComponent {
  papel: IPapel;

  constructor(protected papelService: PapelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.papelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'papelListModification',
        content: 'Deleted an papel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-papel-delete-popup',
  template: ''
})
export class PapelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ papel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PapelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.papel = papel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/papel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/papel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
